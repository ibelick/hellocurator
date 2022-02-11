import { Web3Provider } from "@ethersproject/providers";
import snapshot from "@snapshot-labs/snapshot.js";

declare global {
  interface Window {
    ethereum: any;
  }
}

const hub = "https://hub.snapshot.org";
const client = new snapshot.Client712(hub);

export const createProposal = async (
  contractAddress: string,
  nftId: string
) => {
  const web3 = new Web3Provider(window.ethereum);

  const [account] = await web3.listAccounts();

  const receipt = await client.proposal(web3, account, {
    space: "artinu.eth",
    type: "single-choice",
    title: `PROPOSAL:ETHEREUM:${contractAddress}:${nftId}`,
    body: `link: https://rarible.com/token/${contractAddress}:${nftId}`,
    choices: ["yes", "no"],
    start: 1636984800,
    end: 1637244000,
    snapshot: 13620822,
    network: "1",
    strategies: JSON.stringify({}),
    plugins: JSON.stringify({}),
    metadata: JSON.stringify({}),
  });

  return receipt;
};
