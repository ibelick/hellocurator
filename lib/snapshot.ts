import { Web3Provider } from "@ethersproject/providers";
import snapshot from "@snapshot-labs/snapshot.js";

const hub = "https://hub.snapshot.org";
const client = new snapshot.Client712(hub);

export const createProposal = async (
  contractAddress: string,
  nftId: string
) => {
  const web3 = new Web3Provider(window.ethereum);

  const [account] = await web3.listAccounts();

  const receipt = await client.proposal(web3, account, {
    space: "loopclub.eth",
    type: "single-choice",
    title: `ETHEREUM:${contractAddress}:${nftId}`,
    body: `link: https://rarible.com/token/${contractAddress}:${nftId}`,
    choices: ["🔥", "👎"],
    // @todo: choose a format for date proposal
    start: Math.floor(Date.now() / 1000),
    end: Math.floor((Date.now() + 10000000) / 1000),
    snapshot: 14185713,
    network: "1",
    strategies: JSON.stringify({}),
    plugins: JSON.stringify({}),
    metadata: JSON.stringify({}),
  });

  return receipt;
};

export const castVote = async (proposal: string, choice: number) => {
  const web3 = new Web3Provider(window.ethereum);

  const [account] = await web3.listAccounts();

  const receipt = await client.vote(web3, account, {
    space: "loopclub.eth",
    proposal,
    type: "single-choice",
    choice,
    metadata: JSON.stringify({}),
  });

  return receipt;
};
