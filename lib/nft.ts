import { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import { toAddress, toBigNumber } from "@rarible/types";
import { SellRequest } from "@rarible/protocol-ethereum-sdk/build/order/sell";
import { Order } from "@rarible/ethereum-api-client";
import { SimpleOrder } from "@rarible/protocol-ethereum-sdk/build/order/types";

// stagging
export const BASE_URL_ETHEREUM =
  "https://ethereum-api-staging.rarible.org/v0.1";
// mainnet
export const BASE_URL_MULTICHAIN = "https://api.rarible.org/v0.1";

export const getItemById = async (itemId: string) => {
  const response = await fetch(`${BASE_URL_MULTICHAIN}/items/${itemId}`, {
    method: "GET",
  });
  const nft = await response.json();

  return nft;
};

export const getItemOrders = async (contractId: string, tokenId: string) => {
  const response = await fetch(
    `${BASE_URL_ETHEREUM}/order/orders/sell/byItem?contract=${contractId}&tokenId=${tokenId}`
  );
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

// @todo
export const lazyMint = async (raribleSdk: RaribleSdk) => {
  const uri = "ipfs:/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp";
  const makerAccount = toAddress("0xcE9798d145cA63B5FdE24f651cC29B1C4fa07744");

  const nftCollection =
    await raribleSdk.apis.nftCollection.getNftCollectionById({
      collection: toAddress("0xf2f61be6495f43f7836ddde8de70a0987d7c22fb"),
    });

  const creators = [
    {
      account: toAddress(makerAccount),
      value: 10000,
    },
  ];

  const token = await generateNftToken(nftCollection.id, makerAccount);

  const response = await raribleSdk.nft.mint({
    // @ts-ignore
    collection: nftCollection,
    uri,
    supply: 1000,
    lazy: true,
    nftTokenId: token,
    creators,
  });

  return response;
};

export const generateNftToken = async (collection: string, minter: string) => {
  return (
    await fetch(
      `${BASE_URL_ETHEREUM}/nft/collections/${collection}/generate_token_id?minter=${minter}`
    )
  ).json();
};
