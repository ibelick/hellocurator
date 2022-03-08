import { createSellOrder } from "lib/nft";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Web3Ethereum } from "@rarible/web3-ethereum";
import { createRaribleSdk, RaribleSdk } from "@rarible/protocol-ethereum-sdk";

const useRarible = () => {
  const [sdk, setSdk] = useState<RaribleSdk | null>(null);

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

  const sellOrder = (
    contractAddress: string,
    tokenId: string,
    sellerAddress: string,
    price: string,
    originFees?:
      | {
          account: string;
          value: number;
        }[]
  ) => {
    if (!sdk) {
      return;
    }

    createSellOrder(
      sdk,
      contractAddress,
      tokenId,
      sellerAddress,
      price,
      originFees
    );
  };

  return {
    sellOrder,
  };
};

export default useRarible;
