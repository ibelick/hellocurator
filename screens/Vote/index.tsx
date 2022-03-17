import { getVotingPower, loopclubStrategies } from "lib/snapshot";
import { Proposal } from "types/snapshot";
import HeaderStorefront from "components/HeaderStorefront";
import type { SpaceInfo } from "components/HeaderStorefront";
import { useQuery } from "@apollo/client";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ProposalGallery from "./ProposalGallery";

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
  const {
    loading: isProposalsLoading,
    error,
    data,
  } = useQuery(SNAPSHOT_GET_PROPOSALS, {
    variables: {
      spaceIn: uid,
      state: "active",
    },
  });
  const [{ data: accountData }] = useAccount();
  const [userVotingPower, setUserVotingPower] = useState<number | null>(null);

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
    (proposal: Proposal) => !proposal.title.startsWith("Add the NFT")
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
      <ProposalGallery
        proposals={proposals}
        userVotingPower={userVotingPower}
      />
    </div>
  );
};

export default Vote;
