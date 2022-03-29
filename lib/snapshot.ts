import { Web3Provider } from "@ethersproject/providers";
import snapshot from "@snapshot-labs/snapshot.js";
import { WHITELISTED_STOREFRONTS } from "utils/storefront";

const hub = "https://hub.snapshot.org";
const client = new snapshot.Client712(hub);

// @todo: replace when onboard more spaces
export const loopclubStrategies = [
  {
    name: "erc721",
    params: {
      symbol: "Morphs",
      address: "0x480894ceedc8ff63b6db624568f666e634dc8623",
    },
  },
];

export const oldCreateProposal = async (itemId: string) => {
  // @ts-ignore
  const web3 = new Web3Provider(window.ethereum);

  const [account] = await web3.listAccounts();

  const receipt = await client.proposal(web3, account, {
    space: WHITELISTED_STOREFRONTS[0],
    type: "single-choice",
    title: `Add the NFT ETHEREUM:${itemId} to the curation`,
    body: `link to NFT: https://rarible.com/token/${itemId}`,
    choices: ["🔥", "👎"],
    start: Math.floor(Date.now() / 1000),
    end: Math.floor((Date.now() + 86400000) / 1000),
    snapshot: 14300331,
    network: "1",
    // @todo: params
    strategies: JSON.stringify(loopclubStrategies),
    plugins: JSON.stringify({}),
    metadata: JSON.stringify({}),
  });

  return receipt;
};

export const createProposal = async (imageUrl: string, metadataUrl: string) => {
  // @ts-ignore
  const web3 = new Web3Provider(window.ethereum);

  const [account] = await web3.listAccounts();

  const receipt = await client.proposal(web3, account, {
    space: WHITELISTED_STOREFRONTS[0],
    type: "single-choice",
    title: `${imageUrl}`,
    body: `${metadataUrl}`,
    choices: ["+1"],
    start: Math.floor(Date.now() / 1000),
    end: Math.floor((Date.now() + 86400000) / 1000),
    snapshot: 14300331,
    network: "1",
    // @todo: params
    strategies: JSON.stringify(loopclubStrategies),
    plugins: JSON.stringify({}),
    metadata: JSON.stringify({}),
  });

  return receipt;
};

interface Relayer {
  address: string;
  receipt: string;
}

export interface Receipt {
  id: string;
  ipfs: string;
  relayer: Relayer;
}

export const castVote = async (proposal: string, choice: number) => {
  // @ts-ignore
  const web3 = new Web3Provider(window.ethereum);

  const [account] = await web3.listAccounts();

  const receipt = await client.vote(web3, account, {
    space: WHITELISTED_STOREFRONTS[0],
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

export const getVotingPower = async (voters: string[]) => {
  const space = WHITELISTED_STOREFRONTS[0];
  const network = "1";

  try {
    const score: Score[] = await snapshot.utils.getScores(
      space,
      loopclubStrategies,
      network,
      voters
    );

    return score;
  } catch (err) {
    console.error("Failed to fetch API");
  }
};
