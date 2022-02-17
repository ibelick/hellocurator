import { castVote } from "lib/snapshot";
import { Proposals } from "types/snapshot";
import Link from "next/link";
import { useRouter } from "next/router";
import useNft from "hooks/useNft";

export interface VoteProps {
  proposals: Proposals[];
}

const Vote: React.FC<VoteProps> = ({ proposals }) => {
  const router = useRouter();
  const { uid } = router.query;

  return (
    <div>
      <Link href={`/${uid}`}>Storefront</Link>
      <ul>
        {proposals?.map((proposal: Proposals) => {
          return <Proposal proposal={proposal} key={proposal.id} />;
        })}
      </ul>
    </div>
  );
};

const Proposal: React.FC<{ proposal: Proposals }> = ({ proposal }) => {
  const voteEnd = new Date(proposal.end * 1000).toLocaleString("en-US");

  return (
    <li className="mb-4">
      <div className="flex items-center justify-between rounded border bg-slate-100 p-4">
        <div>
          <NFTInfo itemId={proposal.title} />
        </div>
        <div>Vote ends {voteEnd}</div>
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
    <div className="flex">
      <img
        className="h-full w-20 rounded"
        src={nft?.meta?.content[0].url}
        alt={nft?.meta?.name}
      />
      <p className="ml-2">{nft?.meta?.name}</p>
    </div>
  );
};

export default Vote;
