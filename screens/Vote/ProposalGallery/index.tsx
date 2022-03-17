import { castVote, loopclubStrategies } from "lib/snapshot";
import { Proposal } from "types/snapshot";
import IconButton from "components/IconButton";
import useVote from "hooks/useVote";
import { useState } from "react";
import { truncateEthAddress } from "utils/ethereum";

interface ProposalGalleryProps {
  proposals: Proposal[];
  userVotingPower: number | null;
}

const ProposalGallery: React.FC<ProposalGalleryProps> = ({
  proposals,
  userVotingPower,
}) => {
  if (!proposals) {
    <div>
      <p>
        no proposals yet <span>😢</span>
      </p>
    </div>;
  }

  return (
    <ul className="columns-1 sm:columns-2 md:columns-3">
      {proposals?.map((proposal: Proposal) => {
        return (
          <Proposal
            key={proposal.id}
            proposal={proposal}
            userVotingPower={userVotingPower!}
          />
        );
      })}
    </ul>
  );
};

const timeBetweenDates = (date1: Date, date2: Date) => {
  const differenceMilliseconds = date1.getTime() - date2.getTime();
  const minutes = Math.round(differenceMilliseconds / 60000);
  const hours = Math.round(differenceMilliseconds / 3600000);
  const days = Math.round(differenceMilliseconds / 86400000);

  if (!days && !hours) {
    return `${minutes} min.`;
  }

  if (!days) {
    return `${hours} hr.`;
  }

  return `${days} days`;
};

const Proposal: React.FC<{ proposal: Proposal; userVotingPower: number }> = ({
  proposal,
  userVotingPower,
}) => {
  const voteEnd = new Date(proposal.end * 1000);
  const today = new Date(Date.now());
  const remainingTime = timeBetweenDates(voteEnd, today);
  const [voteReceiptId, setVoteReceiptId] = useState<string | null>(null);

  const imgLink = proposal.body.match(/\bhttps?:\/\/\S+/gi)?.[0];
  // const description = imgLink && proposal.body.replace(imgLink, "").trim();

  return (
    <li className="mb-6 break-inside-avoid">
      <div className="flex flex-col items-start justify-between">
        <img src={imgLink} alt={proposal.title} />
        <span className="my-2 font-medium">{proposal.title}</span>
        <span>Submitted by {truncateEthAddress(proposal.author)}</span>
        {/* <div className="whitespace-pre-line">{description}</div> */}
        <div className="flex w-full items-center justify-between">
          <Votes
            choices={proposal.choices}
            proposalId={proposal.id}
            voteReceiptId={voteReceiptId}
          />
          <IconButton
            disabled={userVotingPower === 0}
            onClick={async () => {
              const receipt = await castVote(proposal.id, 1);
              // @ts-ignore
              setVoteReceiptId(receipt.id as string);
            }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 56 56"
              >
                <text y="34" x="19">
                  {proposal.choices[0]}
                </text>
              </svg>
            }
          />
        </div>
      </div>
    </li>
  );
};

const Votes: React.FC<{
  choices: string[];
  proposalId: string;
  voteReceiptId?: string | null;
}> = ({ choices, proposalId, voteReceiptId }) => {
  const { choiceWithVotingPower } = useVote(proposalId, choices, voteReceiptId);

  const votingPower =
    choiceWithVotingPower &&
    Math.round(choiceWithVotingPower?.[0].votingPower * 10000) / 10000;

  return (
    <span className="font-medium">
      {votingPower} {loopclubStrategies[0].params.symbol}
    </span>
  );
};

export default ProposalGallery;
