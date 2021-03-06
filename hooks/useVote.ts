import { useQuery } from "@apollo/client";
import { SNAPSHOS_GET_VOTE } from "lib/queries";
import { getVotingPower } from "lib/snapshot";
import { useEffect, useState } from "react";
import type { Vote } from "types/snapshot";
import { useAccount } from "wagmi";

interface VoteData {
  votes: Vote[];
}

export interface ChoiceWithVotingPower {
  label: string;
  choice: number;
  votingPower: number;
}

const useVote = (
  proposalId?: string,
  availableChoices?: string[],
  voteReceiptId?: string | null
) => {
  const [{ data: accountData }] = useAccount();
  const { error, data, refetch } = useQuery<VoteData, { proposalId?: string }>(
    SNAPSHOS_GET_VOTE,
    {
      variables: {
        proposalId,
      },
    }
  );
  const [hasUserVoted, setHasUserVoted] = useState(false);

  // refetch votes data when user cast a vote
  useEffect(() => {
    refetch();
  }, [voteReceiptId]);

  const [choiceWithVotingPower, setChoiceWithVotingPower] = useState<
    ChoiceWithVotingPower[] | null
  >(null);
  const [totalVotingPower, setTotalVotingPower] = useState<number | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      if (!data || error || !availableChoices) {
        return;
      }

      if (!Boolean(data.votes.length)) {
        const choiceWithVotingPower = availableChoices.map((choice, index) => {
          return {
            label: choice,
            choice: index + 1,
            votingPower: 0,
          };
        });
        setChoiceWithVotingPower(choiceWithVotingPower);
        setTotalVotingPower(0);

        return;
      }

      const voters = data.votes.map((vote) => vote.voter);
      const hasConnectedUserAlreadyVote = voters.some(
        (vote) => vote === accountData?.address
      );
      setHasUserVoted(hasConnectedUserAlreadyVote);

      const score = await getVotingPower(voters);

      const totalVotingPower = Object.values(score![0]).reduce(
        (partialSum, a) => partialSum + a,
        0
      );
      setTotalVotingPower(totalVotingPower);

      const scoreByChoice = data.votes.map((vote) => {
        return {
          choice: vote.choice,
          votingPower: score![0][vote.voter],
        };
      });

      const choiceWithVotingPower = availableChoices.map((choice, index) => {
        const votingPower = scoreByChoice.reduce((acc, val) => {
          if (index + 1 === val.choice) {
            return acc + val.votingPower;
          }

          return acc;
        }, 0);

        return {
          label: choice,
          choice: index + 1,
          votingPower,
        };
      });

      setChoiceWithVotingPower(choiceWithVotingPower);
    };

    fetchScore();
  }, [data, availableChoices]);

  return { choiceWithVotingPower, totalVotingPower, hasUserVoted };
};

export default useVote;
