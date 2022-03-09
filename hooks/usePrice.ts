import useSWR from "swr";
import { fetcher } from "lib/fetch";

const usePrice = (fromCurrencies: string, vsCurrencies: string) => {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrencies}&vs_currencies=${vsCurrencies}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !data?.id,
  };
};

export default usePrice;
