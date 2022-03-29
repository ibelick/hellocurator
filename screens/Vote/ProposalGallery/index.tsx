import { castVote, loopclubStrategies } from "lib/snapshot";
import { Proposal } from "types/snapshot";
import IconButton from "components/IconButton";
import useVote from "hooks/useVote";
import { useState } from "react";
import { truncateEthAddress } from "utils/ethereum";
import useSWR from "swr";
import { fetcher } from "lib/fetch";
import { useRouter } from "next/router";
import Link from "next/link";

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
    <div>
      <ul className="columns-1 sm:columns-2 md:columns-4">
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
    </div>
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
  const [voteReceiptId, setVoteReceiptId] = useState<string | null>(null);

  return (
    <li className="mb-6 break-inside-avoid">
      <div className="flex flex-col items-start justify-between">
        <Item
          img={proposal.title}
          metadataUrl={proposal.body}
          authorAddress={proposal.author}
          id={proposal.id}
        />
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

const Item: React.FC<{
  metadataUrl: string;
  img: string;
  authorAddress: string;
  id: string;
}> = ({ metadataUrl, img, authorAddress, id }) => {
  const { data: metadata, error } = useSWR(metadataUrl, fetcher);
  const router = useRouter();
  const { eventId } = router.query;

  if (!error && !metadata) {
    return null;
  }

  return (
    <>
      <Link href={`/events/${eventId}/${id}`}>
        <a className="flex flex-col">
          <img src={img} alt={metadata.name} />
          <span className="mt-4 text-lg font-medium">{metadata.name}</span>
        </a>
      </Link>
      <span className=" text-gray-400">
        Submitted by {truncateEthAddress(authorAddress)}
      </span>
      <div className="mt-4 mb-4 h-0.5 w-full bg-gray-100"></div>
    </>
  );
};

const Votes: React.FC<{
  choices: string[];
  proposalId: string;
  voteReceiptId?: string | null;
}> = ({ choices, proposalId, voteReceiptId }) => {
  const { choiceWithVotingPower } = useVote(proposalId, choices, voteReceiptId);

  const totalVotingPower =
    choiceWithVotingPower &&
    Math.round(choiceWithVotingPower?.[0].votingPower * 10000) / 10000;

  return (
    <div>
      <p className="text-sm text-gray-400">Votes</p>
      <span className="font-medium">
        {totalVotingPower} {loopclubStrategies[0].params.symbol}
      </span>
    </div>
  );
};

export default ProposalGallery;
