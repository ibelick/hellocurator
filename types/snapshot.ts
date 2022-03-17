export interface Space {
  __typename: string;
  id: string;
  name: string;
  avatar: string;
}

export interface Proposal {
  __typename: string;
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: string;
  state: string;
  author: string;
  strategies: Strategy[];
  space: Space;
  scores_state: string;
  scores: any[];
  scores_updated: number;
}

export interface Space {
  id: string;
  name: string;
  about: string;
  network: string;
  symbol: string;
  members: string[];
}

export interface Vote {
  __typename: string;
  choice: number;
  voter: string;
  space: Space;
  proposal: VoteProposal;
}

interface Params {
  symbol: string;
}

interface Strategy {
  __typename: string;
  params: Params;
  name: string;
}

interface VoteProposal {
  __typename: string;
  created: number;
}
