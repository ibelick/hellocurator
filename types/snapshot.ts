export interface Space {
  __typename: string;
  id: string;
  name: string;
}

export interface Proposals {
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
