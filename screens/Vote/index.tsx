import { castVote } from "lib/snapshot";
import { Proposals } from "types/snapshot";
import useNft from "hooks/useNft";
import HeaderStorefront from "components/HeaderStorefront";
import type { SpaceInfo } from "components/HeaderStorefront";

export interface VoteProps {
  proposals: Proposals[];
  info: SpaceInfo;
}

const Vote: React.FC<VoteProps> = ({ proposals, info }) => {
  return (
    <div>
      <HeaderStorefront info={info} />
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {proposals?.map((proposal: Proposals) => {
          return <Proposal proposal={proposal} key={proposal.id} />;
        })}
      </ul>
    </div>
  );
};

const Proposal: React.FC<{ proposal: Proposals }> = ({ proposal }) => {
  // @todo: choose a format for date proposal
  const voteEnd = new Date(proposal.end * 1000).toLocaleString("en-US");

  return (
    <li className="mb-4">
      <div className="flex flex-col items-start justify-between">
        <div>
          <NFTInfo itemId={proposal.title} />
        </div>
        {/* <div>Vote ends {voteEnd}</div> */}
        <div>
          {proposal.choices.map((choice, index: number) => {
            return (
              <div key={`${index}-${choice}`}>
                <span
                  onClick={() => castVote(proposal.id, index + 1)}
                  className="cursor-pointer"
                >
                  {choice}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
};

const NFTInfo: React.FC<{ itemId: string }> = ({ itemId }) => {
  const { nft, isError, isLoading } = useNft(itemId);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <p className="mb-2">{nft?.meta?.name}</p>
      <img
        className="h-full w-full rounded"
        src={nft?.meta?.content[0].url}
        alt={nft?.meta?.name}
      />
    </div>
  );
};

export default Vote;
