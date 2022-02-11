import { gql } from "@apollo/client";

export const SNAPSHOT_GET_PROPOSALS = gql`
  query Proposals {
    proposals(
      first: 20
      skip: 0
      where: { space_in: ["gitcoindao.eth"], state: "closed" }
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
