import { castVote } from "lib/snapshot";
import { Proposals } from "types/snapshot";
import useNft from "hooks/useNft";
import IconButton from "components/IconButton";
import Progress from "components/Progress";
import HeaderStorefront from "components/HeaderStorefront";
import type { SpaceInfo } from "components/HeaderStorefront";
import { useQuery } from "@apollo/client";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import { useRouter } from "next/router";
import useVote from "hooks/useVote";
import { useState } from "react";

export interface VoteProps {
  info: SpaceInfo;
}

const Vote: React.FC<VoteProps> = ({ info }) => {
  return (
    <div className="pb-12">
      <HeaderStorefront info={info} />
      <Proposals />
    </div>
  );
};

const Proposals: React.FC = () => {
  const router = useRouter();
  const { uid } = router.query;

  const { loading, error, data } = useQuery(SNAPSHOT_GET_PROPOSALS, {
    variables: {
      spaceIn: uid,
      state: "active",
    },
  });

  if (loading) return null;
  if (error) return <p>Error :(</p>;

  return (
    <ul className="columns-1 gap-8 sm:columns-2 md:columns-3">
      {data.proposals?.map((proposal: Proposals) => {
        return <Proposal proposal={proposal} key={proposal.id} />;
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

const Proposal: React.FC<{ proposal: Proposals }> = ({ proposal }) => {
  const voteEnd = new Date(proposal.end * 1000);
  const today = new Date(Date.now());
  const remainingTime = timeBetweenDates(voteEnd, today);
  const [receiptId, setReceiptId] = useState<string | null>(null);

  return (
    <li className="mb-6 break-inside-avoid">
      <div className="flex flex-col items-start justify-between rounded-xl bg-gray-50 p-4">
        <div>
          <NFTInfo itemId={proposal.title.match(/ETHEREUM\S+/g)?.[0]} />
        </div>
        <Votes
          choices={proposal.choices}
          proposalId={proposal.id}
          receiptId={receiptId}
        />
        <div className="mb-4 flex w-full justify-center gap-4">
          {proposal.choices.map((choice, index: number) => {
            return (
              <IconButton
                onClick={async () => {
                  const receipt = await castVote(proposal.id, index + 1);
                  // @ts-ignore
                  setReceiptId(receipt.id as string);
                }}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                  >
                    <text y="34" x="19">
                      {choice}
                    </text>
                  </svg>
                }
                key={`${index}-${choice}`}
              />
            );
          })}
        </div>
        <div className="w-full text-center">
          <p className="text-sm text-slate-400">Vote ends in {remainingTime}</p>
        </div>
      </div>
    </li>
  );
};

const Votes: React.FC<{
  choices: string[];
  proposalId: string;
  receiptId?: string | null;
}> = ({ choices, proposalId, receiptId }) => {
  const { choiceWithVotingPower, totalVotingPower } = useVote(
    proposalId,
    choices,
    receiptId
  );

  return (
    <div className="w-full">
      {choices?.map((choice, index: number) => {
        const label = choiceWithVotingPower
          ? `${choiceWithVotingPower?.[index].label}`
          : undefined;
        const value =
          totalVotingPower && choiceWithVotingPower
            ? (Math.round(
                (100 * choiceWithVotingPower?.[index].votingPower) /
                  totalVotingPower
              ) *
                100) /
              100
            : 0;

        return (
          <div key={`${index}-${choice}`} className="mb-4">
            <Progress value={value} label={label} />
          </div>
        );
      })}
    </div>
  );
};

const NFTInfo: React.FC<{ itemId?: string }> = ({ itemId }) => {
  if (!itemId) {
    return <p>failed to load.</p>;
  }

  const { nft, isError, isLoading } = useNft(itemId);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <img
        className="h-full w-full rounded"
        src={nft?.meta?.content[0].url}
        alt={nft?.meta?.name}
      />
      <p className="my-2 font-medium">{nft?.meta?.name}</p>
    </div>
  );
};

export default Vote;
