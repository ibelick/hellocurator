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
          <h2 className="mt-4 text-xl font-medium text-black">
            Waiting for signature...
          </h2>
          <p className="mt-2 text-gray-400">
            Please sign the transaction using Snapshot to vote
          </p>
        </div>
      </Dialog>
      <IconButton
        disabled={userVotingPower === 0 || hasUserVoted}
        onClick={onVote}
        icon={
          !hasUserVoted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 56 56"
            >
              <text className="font-bold" y="34" x="19">
                {choice}
              </text>
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )
        }
      />
    </>
  );
};

export default VoteButton;
