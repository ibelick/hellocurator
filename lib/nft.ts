import { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import { toAddress, toBigNumber } from "@rarible/types";
import { SellRequest } from "@rarible/protocol-ethereum-sdk/build/order/sell";
import { Order } from "@rarible/ethereum-api-client";
import { SimpleOrder } from "@rarible/protocol-ethereum-sdk/build/order/types";

export const getItemById = async (itemId: string) => {
  const response = await fetch(`https://api.rarible.org/v0.1/items/${itemId}`, {
    method: "GET",
  });
  const nft = await response.json();

  return nft;
};

export const getItemOrders = async (contractId: string, tokenId: string) => {
  const response = await fetch(
    `https://ethereum-api.rarible.org/v0.1/order/orders/sell/byItem?contract=${contractId}&tokenId=${tokenId}`
  );
  // const response = await fetch(`https://api.rarible.org/v0.1/orders/${itemId}`);
  const order = await response.json();

  return order;
};

// @todo: make it available for other contract type
export const createSellOrder = async (
  raribleSdk: RaribleSdk,
  contractAddress: string,
  tokenId: string,
  sellerAddress: string,
  price: string,
  originFees?:
    | {
        account: string;
        value: number;
      }[]
): Promise<Order> => {
  const request: SellRequest = {
    makeAssetType: {
      assetClass: "ERC721",
      contract: toAddress(contractAddress),
      tokenId: toBigNumber(tokenId),
    },
    amount: 1,
    maker: toAddress(sellerAddress),
    originFees:
      originFees?.map((fee) => ({
        account: toAddress(fee.account),
        value: fee.value,
      })) || [],
    // originFees: [
    //   {
    //     account: toAddress("0x12e0Aedbc31d3AdEfB5c2799206d53c235ff4561"),
    //     value: 4500,
    //   },
    //   {
    //     account: toAddress("0xb45515A368a13Bc03c04E788B751D5A1a13E4BA3"),
    //     value: 4500,
    //   },
    //   {
    //     account: toAddress("0xcE9798d145cA63B5FdE24f651cC29B1C4fa07744"),
    //     value: 100,
    //   },
    // ],
    payouts: [],
    price,
    takeAssetType: {
      assetClass: "ETH",
    },
  };

  const order: Order = await raribleSdk.order.sell(request);

  return order;
};

export const removeFromSellOrder = async (
  raribleSdk: RaribleSdk,
  sellOrder: SimpleOrder
) => {
  const order = await raribleSdk.order.cancel(sellOrder);

  return order;
};
