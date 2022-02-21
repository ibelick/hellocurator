import { castVote } from "lib/snapshot";
import { Proposals } from "types/snapshot";
import useNft from "hooks/useNft";
import IconButton from "components/IconButton";
import Progress from "components/Progress";
import HeaderStorefront from "components/HeaderStorefront";
import type { SpaceInfo } from "components/HeaderStorefront";

export interface VoteProps {
  proposals: Proposals[];
  info: SpaceInfo;
}

const Vote: React.FC<VoteProps> = ({ proposals, info }) => {
  return (
    <div className="pb-12">
      <HeaderStorefront info={info} />
      <ul className="columns-1 gap-8 sm:columns-2 md:columns-3">
        {proposals?.map((proposal: Proposals) => {
          return <Proposal proposal={proposal} key={proposal.id} />;
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

const Proposal: React.FC<{ proposal: Proposals }> = ({ proposal }) => {
  // @todo: choose a format for date proposal
  // const voteEnd = new Date(proposal.end * 1000).toLocaleString("en-US");

  const voteEnd = new Date(proposal.end * 1000);
  const today = new Date(Date.now());
  const remainingTime = timeBetweenDates(voteEnd, today);

  return (
    <li className="mb-6 break-inside-avoid">
      <div className="flex flex-col items-start justify-between rounded-xl bg-gray-50 p-4">
        <div>
          <NFTInfo itemId={proposal.title.match(/ETHEREUM\S+/g)?.[0]} />
        </div>
        <div className="w-full">
          {proposal.choices.map((choice, index: number) => {
            return (
              <div key={`${index}-${choice}`} className="mb-4">
                <Progress value={0} label={choice} />
              </div>
            );
          })}
        </div>
        <div className="mb-4 flex w-full justify-center gap-4">
          {proposal.choices.map((choice, index: number) => {
            return (
              <IconButton
                onClick={() => castVote(proposal.id, index + 1)}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <text y="30" x="14">
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

const NFTInfo: React.FC<{ itemId?: string }> = ({ itemId }) => {
  if (!itemId) {
    return <p>failed to load.</p>;
  }

  const { nft, isError, isLoading } = useNft(itemId);

  if (isLoading) {
    return <p>loading...</p>;
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
      <p className="my-2 text-xl">{nft?.meta?.name}</p>
    </div>
  );
};

export default Vote;
