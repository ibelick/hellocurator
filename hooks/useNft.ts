import useSWR from "swr";
import { fetcher } from "lib/fetch";
import type { NFT } from "types/rarible";
import { BASE_URL_MULTICHAIN } from "lib/nft";

const useNft = (assetId: string) => {
  const { data, error } = useSWR<NFT>(
    `${BASE_URL_MULTICHAIN}/items/${assetId}`,
    fetcher
  );

  return {
    nft: data,
    isLoading: !error && !data,
    isError: !data?.id,
  };
};

export default useNft;
