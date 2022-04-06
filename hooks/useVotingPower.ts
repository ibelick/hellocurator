import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getVotingPower } from "lib/snapshot";

const useVotingPower = () => {
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

  return {
    userVotingPower,
    isLoading: Boolean(!accountData?.address && !userVotingPower),
    isError: !accountData?.address,
  };
};

export default useVotingPower;
