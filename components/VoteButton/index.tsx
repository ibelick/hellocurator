import { castVote } from "lib/snapshot";
import Dialog from "components/Dialog";
import Spinner from "components/Spinner";
import IconButton from "components/IconButton";
import { useState } from "react";

interface VoteButtonProps {
  userVotingPower: number;
  proposalId: string;
  choice: string;
  setVoteReceiptId: (arg: string) => void;
  hasUserVoted: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({
  userVotingPower,
  proposalId,
  choice,
  setVoteReceiptId,
  hasUserVoted,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onVote = async () => {
    setIsLoading(true);
    try {
      const receipt = await castVote(proposalId, 1);

      // @ts-ignore
      setVoteReceiptId(receipt.id as string);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Dialog isOpen={isLoading}>
        <div className="flex flex-col text-center">
          <span className="flex w-full justify-center">
            <Spinner variant="tertiary" size="xl" />
          </span>
          <h2 className="mt-4 text-xl font-medium text-black">Loading...</h2>
          <p className="mt-2 text-gray-400">
            You have to sign the transaction to vote
          </p>
        </div>
      </Dialog>
      <IconButton
        disabled={userVotingPower === 0 || hasUserVoted}
        onClick={onVote}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
          >
            {!hasUserVoted ? (
              <text y="34" x="19">
                {choice}
              </text>
            ) : (
              <text y="34" x="6">
                voted
              </text>
            )}
          </svg>
        }
      />
    </>
  );
};

export default VoteButton;
