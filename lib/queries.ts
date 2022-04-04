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

export const SNAPSHOT_GET_PROPOSAL = gql`
  query GetProposal($id: String!) {
    proposal(id: $id) {
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
      avatar
      filters {
        minScore
        onlyMembers
      }
      proposalsCount
    }
  }
`;

export const SNAPSHOS_GET_VOTE = gql`
  query Votes($proposalId: String!) {
    votes(
      first: 1000
      skip: 0
      where: { proposal: $proposalId }
      orderBy: "created"
      orderDirection: desc
    ) {
      choice
      voter
      space {
        id
      }
      proposal {
        created
        strategies {
          params
          name
          __typename
        }
      }
    }
  }
`;
