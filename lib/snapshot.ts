import { Web3Provider } from "@ethersproject/providers";
import snapshot from "@snapshot-labs/snapshot.js";
import { WHITELISTED_STOREFRONTS, SPACE_INIT } from "utils/storefront";

const hub = "https://hub.snapshot.org";
const client = new snapshot.Client712(hub);

// @todo: replace when onboard more spaces
export const hellocuratorStrategies = [
  {
    name: "eth-with-balance",
    params: {
      symbol: "HELLO",
      minBalance: 0.001,
    },
  },
];

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
    end: Math.floor((SPACE_INIT?.date_end! + 86400000) / 1000),
    snapshot: 14300331,
    network: "1",
    // @todo: params
    strategies: JSON.stringify(hellocuratorStrategies),
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
      hellocuratorStrategies,
      network,
      voters
    );

    return score;
  } catch (err) {
    console.error("Failed to fetch API");
  }
};
