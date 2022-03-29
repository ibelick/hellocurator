import { castVote, loopclubStrategies } from "lib/snapshot";
import Button from "components/Button";
import useVotingPower from "hooks/useVotingPower";
import { useAccount, useEnsLookup } from "wagmi";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { SNAPSHOT_GET_PROPOSAL } from "lib/queries";
import useVote from "hooks/useVote";
import Link from "next/link";
import { SPACE_INIT } from "utils/storefront";
import IconButton from "components/IconButton";
import { useState } from "react";
import { truncateEthAddress } from "utils/ethereum";
import Timer from "components/Timer";

export interface MetadataProposalProps {
  description: string;
  external_url?: string;
  image: string;
  name: string;
}

interface MetaProposalProps {
  meta: MetadataProposalProps;
}

const MetadataProposal: React.FC<MetaProposalProps> = ({ meta }) => {
  const { userVotingPower } = useVotingPower();
  const [{ data: accountData }] = useAccount();
  const router = useRouter();
  const { proposalId, uid } = router.query;
  const { data } = useQuery(SNAPSHOT_GET_PROPOSAL, {
    variables: {
      id: proposalId,
    },
  });
  const [voteReceiptId, setVoteReceiptId] = useState<string | null>(null);
  const { choiceWithVotingPower } = useVote(
    proposalId as string,
    data?.proposal?.choices,
    voteReceiptId
  );
  const totalVotingPower =
    choiceWithVotingPower &&
    Math.round(choiceWithVotingPower?.[0].votingPower * 10000) / 10000;
  const [{ data: dataEns }] = useEnsLookup({
    address: data?.proposal?.author,
  });
  const dateVoteEnd = new Date(data?.proposal?.end * 1000);
  const isClosed = dateVoteEnd <= new Date();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        {!isClosed ? (
          <>
            <p>Voting ends in</p>
            {dateVoteEnd ? <Timer dateEnd={dateVoteEnd} /> : null}
          </>
        ) : (
          <p>Voting closed</p>
        )}
      </div>
      <div className="h-0.5 w-full bg-gray-100"></div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold">{meta.name}</h1>
        <p className="mb-8">
          for{" "}
          <span className="text-primary-800">{SPACE_INIT?.creator_name}</span>{" "}
          by <span className="text-primary-800">{SPACE_INIT?.event_name}</span>
        </p>
        <div className="mb-8 flex items-center">
          <div className="mr-2 h-6 w-6 rounded-full bg-gradient-to-r from-blue-700 to-red-200"></div>
          <p className="">
            Submitted by{" "}
            {!dataEns && data?.proposal?.author
              ? truncateEthAddress(data?.proposal?.author)
              : dataEns}
          </p>
        </div>
        <p>{meta.description}</p>
      </div>
      <div className="mt-8 flex w-full flex-row justify-between rounded-xl border border-gray-200 bg-white p-6 shadow">
        <div>
          <p className="text-gray-400">Total votes</p>
          <p className="font-lg text-lg font-medium text-primary-800">
            {totalVotingPower} {loopclubStrategies[0].params.symbol}
          </p>
        </div>
        {!isClosed ? (
          <IconButton
            disabled={userVotingPower === 0}
            onClick={async () => {
              if (!proposalId) {
                return;
              }

              const receipt = await castVote(proposalId as string, 1);
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
                  {data?.proposal?.choices}
                </text>
              </svg>
            }
          />
        ) : null}
      </div>
      <div className="mt-4 rounded-lg bg-gray-50 px-4 py-2">
        <p>
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
      <div className="mt-8 flex items-center justify-between">
        <Button variant="secondary">Share the image</Button>
        <Link href={`/events`}>
          <a>
            <Button variant="primary">See all submissions</Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MetadataProposal;
