import { gql } from "@apollo/client";

export const SNAPSHOT_GET_PROPOSALS = gql`
  query GetProposals($spaceIn: String!, $state: String!) {
    proposals(
      first: 100
      skip: 0
      where: { space_in: [$spaceIn], state: $state }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      space {
        id
        name
      }
      scores_state
      scores
      scores_updated
    }
  }
`;

export const SNAPSHOT_GET_SPACE = gql`
  query GetSpace($spaceIn: String!) {
    space(id: $spaceIn) {
      id
      name
      about
      network
      symbol
      members
    }
  }
`;
