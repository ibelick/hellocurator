import { Web3Provider } from "@ethersproject/providers";
import snapshot from "@snapshot-labs/snapshot.js";

const hub = "https://hub.snapshot.org";
const client = new snapshot.Client712(hub);

export const createProposal = async (
  contractAddress: string,
  nftId: string
) => {
  // @ts-ignore
  const web3 = new Web3Provider(window.ethereum);

  const [account] = await web3.listAccounts();

  const receipt = await client.proposal(web3, account, {
    space: "loopclub.eth",
    type: "single-choice",
    title: `Add the NFT ETHEREUM:${contractAddress}:${nftId} to the curation`,
    body: `link to NFT: https://rarible.com/token/${contractAddress}:${nftId}`,
    choices: ["🔥", "👎"],
    start: Math.floor(Date.now() / 1000),
    end: Math.floor((Date.now() + 86400000) / 1000),
    snapshot: 14185713,
    network: "1",
    strategies: JSON.stringify({}),
    plugins: JSON.stringify({}),
    metadata: JSON.stringify({}),
  });

  return receipt;
};

export const castVote = async (proposal: string, choice: number) => {
  // @ts-ignore
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

interface Score {
  [key: string]: number;
}

export const getProposalScore = async (voters: string[]) => {
  const space = "loopclub.eth";
  const strategies = [
    {
      name: "eth-balance",
      params: {
        symbol: "ETH",
      },
    },
  ];
  const network = "1";

  try {
    const score: Score[] = await snapshot.utils.getScores(
      space,
      strategies,
      network,
      voters
    );

    return score;
  } catch (err) {
    console.error("Failed to fetch API");
  }
};
