import type { GetStaticProps, NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import Storefront from "screens/Storefront";
import type { StorefrontProps } from "screens/Storefront";
import type { Proposals } from "types/snapshot";

const StorefrontPage: NextPage<StorefrontProps> = (props) => {
  return <Storefront proposals={props.proposals} assets={props.assets} />;
};

export const getStaticProps: GetStaticProps<StorefrontProps> = async () => {
  const { data: activeProposals } = await apolloClient.query<
    { proposals: Proposals[] | [] },
    { spaceIn: string; state: string }
  >({
    query: SNAPSHOT_GET_PROPOSALS,
    variables: {
      spaceIn: "loopclub.eth",
      state: "active",
    },
  });

  const { data: closedProposals } = await apolloClient.query<
    { proposals: Proposals[] | [] },
    { spaceIn: string; state: string }
  >({
    query: SNAPSHOT_GET_PROPOSALS,
    variables: {
      spaceIn: "loopclub.eth",
      state: "closed",
    },
  });

  const assets = closedProposals.proposals
    .filter(
      (proposal) =>
        proposal.scores[0] > proposal.scores[1] &&
        proposal.title.includes("Add the NFT")
    )
    .map((proposal) => {
      return proposal.title.match(/ETHEREUM\S+/g)?.[0];
    });

  return {
    props: {
      proposals: activeProposals.proposals,
      assets,
    },
  };
};

export default StorefrontPage;
