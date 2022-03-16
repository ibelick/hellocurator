import { castVote, getVotingPower, loopclubStrategies } from "lib/snapshot";
import { Proposals } from "types/snapshot";
import IconButton from "components/IconButton";
import HeaderStorefront from "components/HeaderStorefront";
import type { SpaceInfo } from "components/HeaderStorefront";
import { useQuery } from "@apollo/client";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import { useRouter } from "next/router";
import useVote from "hooks/useVote";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export interface VoteProps {
  info: SpaceInfo;
}

const Vote: React.FC<VoteProps> = ({ info }) => {
  const [createProposalReceiptId, setCreateProposalReceiptId] = useState<
    string | null
  >(null);

  return (
    <div className="pb-12">
      <HeaderStorefront
        info={info}
        setCreateProposalReceiptId={setCreateProposalReceiptId}
      />
      <Proposals createProposalReceiptId={createProposalReceiptId} />
    </div>
  );
};

const Proposals: React.FC<{ createProposalReceiptId?: string | null }> = ({
  createProposalReceiptId,
}) => {
  const router = useRouter();
  const { uid } = router.query;
  const {
    loading: isProposalsLoading,
    error,
    data,
    refetch,
  } = useQuery(SNAPSHOT_GET_PROPOSALS, {
    variables: {
      spaceIn: uid,
      state: "active",
    },
  });
  const [{ data: accountData }] = useAccount();
  const [userVotingPower, setUserVotingPower] = useState<number | null>(null);

  // refetch proposals data when user submit NFT
  useEffect(() => {
    if (!createProposalReceiptId) {
      return;
    }

    refetch();
  }, [createProposalReceiptId]);

  useEffect(() => {
    if (!accountData?.address) {
      setUserVotingPower(0);
      return;
    }

    const fetchVotingPower = async () => {
      const votingPower = await getVotingPower([accountData.address]);

      const userVotingPower = votingPower?.[0][accountData.address];

      if (!userVotingPower) {
        setUserVotingPower(0);
        return;
      }

      setUserVotingPower(userVotingPower);
    };

    fetchVotingPower();
  }, [accountData?.address]);

  if (isProposalsLoading) return null;
  if (error) return <p>Error :(</p>;

  // @todo: fetching proposal image, remove later
  const proposals = data.proposals.filter(
    (proposal: Proposals) => !proposal.title.startsWith("Add the NFT")
  );

  return (
    <div>
      <div className="mb-4 flex-none items-center justify-between rounded-xl bg-gray-50 p-8 md:flex">
        <div className="flex items-center">
          <span>🔥</span>
          <div className="ml-4">
            <h3 className="font-medium">
              Vote for which NFTs should join the gallery
            </h3>
            <p className="text-gray-400">
              Use your {loopclubStrategies[0].params.symbol} to vote
            </p>
          </div>
        </div>
        <div>
          <p className="mt-4 ml-8 md:ml-0 md:mt-0 ">
            Your voting power :{" "}
            {accountData ? (
              <span className="font-bold text-primary-800">
                {userVotingPower} {loopclubStrategies[0].params.symbol}
              </span>
            ) : (
              <span className="font-bold text-primary-800">
                Connect your wallet
              </span>
            )}
          </p>
        </div>
      </div>
      <ul className="columns-1 sm:columns-2 md:columns-3">
        {proposals?.map((proposal: Proposals) => {
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

const Proposal: React.FC<{ proposal: Proposals; userVotingPower: number }> = ({
  proposal,
  userVotingPower,
}) => {
  const voteEnd = new Date(proposal.end * 1000);
  const today = new Date(Date.now());
  const remainingTime = timeBetweenDates(voteEnd, today);
  const [voteReceiptId, setVoteReceiptId] = useState<string | null>(null);

  const imgLink = proposal.body.match(/\bhttps?:\/\/\S+/gi)?.[0];
  const description = imgLink && proposal.body.replace(imgLink, "").trim();

  return (
    <li className="mb-6 break-inside-avoid">
      <div className="flex flex-col items-start justify-between rounded-xl bg-gray-50 p-4">
        <img src={imgLink} alt={proposal.title} />
        <span className="my-2 font-medium">{proposal.title}</span>
        <div className="whitespace-pre-line">{description}</div>
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

export default Vote;
