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
