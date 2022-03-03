import { useEffect, useState } from "react";
import Web3 from "web3";
import { Web3Ethereum } from "@rarible/web3-ethereum";
import { createRaribleSdk, RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import { Order } from "@rarible/ethereum-api-client";
import { toAddress, toBigNumber } from "@rarible/types";
import { SellRequest } from "@rarible/protocol-ethereum-sdk/build/order/sell";
import useNft from "hooks/useNft";

const sellOrder = async (sdk: RaribleSdk) => {
  const contractErc721Address = "0xa857abd882d4f4a5f2e2a7e23c2ab5c34637012a"; // your ERC721 contract address
  const tokenId = toBigNumber("329"); // the ERC721 Id of the token on which we want to place a bid
  const sellerAddress = "0xcE9798d145cA63B5FdE24f651cC29B1C4fa07744"; // Owner of ERC721 token

  const request: SellRequest = {
    makeAssetType: {
      assetClass: "ERC721",
      contract: toAddress(contractErc721Address),
      tokenId: tokenId,
    },
    amount: 1,
    maker: toAddress(sellerAddress),
    originFees: [
      {
        account: toAddress("0x12e0Aedbc31d3AdEfB5c2799206d53c235ff4561"),
        value: 4500,
      },
      {
        account: toAddress("0xb45515A368a13Bc03c04E788B751D5A1a13E4BA3"),
        value: 4500,
      },
      {
        account: toAddress("0xcE9798d145cA63B5FdE24f651cC29B1C4fa07744"),
        value: 100,
      },
    ],
    payouts: [],
    price: 10000000000000000,
    takeAssetType: {
      assetClass: "ETH",
    },
  };

  const order: Order = await sdk.order.sell(request);
  console.log("order", order);
};

const ListItem = () => {
  const [sdk, setSdk] = useState<RaribleSdk | null>(null);
  const { nft, isError, isLoading } = useNft(
    "ETHEREUM:0xa857abd882d4f4a5f2e2a7e23c2ab5c34637012a:314"
  );

  //   console.log("nft", nft);

  useEffect(() => {
    const { ethereum } = window as any;

    const web3 = new Web3(ethereum);

    const web3Ethereum = new Web3Ethereum({
      web3: web3,
    });
    const env = "rinkeby";
    const sdk = createRaribleSdk(web3Ethereum, env);
    setSdk(sdk);
  }, []);

  return <p onClick={() => sellOrder(sdk!)}>sell order</p>;
};

export default ListItem;
