import useSWR from "swr";
import { fetcher } from "lib/fetch";
import { SimpleOrder } from "@rarible/protocol-ethereum-sdk/build/order/types";

const useOrders = (contractId: string, tokenId: string) => {
  const { data, error } = useSWR<{ orders: SimpleOrder[] }>(
    `https://ethereum-api.rarible.org/v0.1/order/orders/sell/byItem?contract=${contractId}&tokenId=${tokenId}`,
    fetcher
  );

  return {
    orders: data,
    isLoading: !error && !data,
    isError: !data?.orders?.[0]?.signature,
  };
};

export default useOrders;
