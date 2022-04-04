import { hellocuratorStrategies } from "lib/snapshot";
import { Proposal } from "types/snapshot";
import useVote from "hooks/useVote";
import type { ChoiceWithVotingPower } from "hooks/useVote";
import { useState } from "react";
import { truncateEthAddress } from "utils/ethereum";
import useSWR from "swr";
import { fetcher } from "lib/fetch";
import { useRouter } from "next/router";
import Link from "next/link";
import VoteButton from "components/VoteButton";
import { useEnsLookup } from "wagmi";

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
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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

const Proposal: React.FC<{ proposal: Proposal; userVotingPower: number }> = ({
  proposal,
  userVotingPower,
}) => {
  const [voteReceiptId, setVoteReceiptId] = useState<string | null>(null);
  const { choiceWithVotingPower, hasUserVoted } = useVote(
    proposal.id,
    proposal.choices,
    voteReceiptId
  );

  return (
    <li className="mb-6 break-inside-avoid rounded-lg border border-gray-100 p-4">
      <div className="flex h-full flex-col items-start justify-between">
        <Item
          img={proposal.title}
          metadataUrl={proposal.body}
          authorAddress={proposal.author}
          id={proposal.id}
        />
        <div className="flex w-full flex-col">
          <div className="mt-4 mb-4 h-0.5 w-full bg-gray-100"></div>
          <div className="flex w-full items-center justify-between">
            <Votes choiceWithVotingPower={choiceWithVotingPower} />
            <VoteButton
              userVotingPower={userVotingPower}
              proposalId={proposal.id}
              choice={proposal.choices[0]}
              setVoteReceiptId={setVoteReceiptId}
              hasUserVoted={hasUserVoted}
            />
          </div>
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
  const [{ data: dataEns }] = useEnsLookup({
    address: authorAddress || undefined,
  });

  if (!error && !metadata) {
    return null;
  }

  return (
    <div>
      <Link href={`/events/${eventId}/${id}`}>
        <a className="flex w-full flex-col">
          <div className="">
            <img
              className="h-44 w-full rounded-lg object-cover"
              src={img}
              alt={metadata.name}
            />
          </div>
          <span className="mt-4 text-lg font-medium">{metadata.name}</span>
        </a>
      </Link>
      <span className=" text-gray-400">
        Submitted by {!dataEns ? truncateEthAddress(authorAddress) : dataEns}
      </span>
    </div>
  );
};

const Votes: React.FC<{
  choiceWithVotingPower: ChoiceWithVotingPower[] | null;
}> = ({ choiceWithVotingPower }) => {
  const totalVotingPower =
    choiceWithVotingPower &&
    Math.round(choiceWithVotingPower?.[0].votingPower * 10000) / 10000;

  return (
    <div className="flex flex-col">
      <p className="text-sm text-gray-400">Votes</p>
      <span className="font-medium">
        {totalVotingPower} {hellocuratorStrategies[0].params.symbol}
      </span>
    </div>
  );
};

export default ProposalGallery;
