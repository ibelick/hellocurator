import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_PROPOSALS, SNAPSHOT_GET_SPACE } from "lib/queries";
import Storefront from "screens/Storefront";
import type { StorefrontProps } from "screens/Storefront";
import type { Proposals, Space } from "types/snapshot";
import { ParsedUrlQuery } from "querystring";
import { WHITELISTED_STOREFRONTS } from "utils/storefront";

const StorefrontPage: NextPage<StorefrontProps> = (props) => {
  return <Storefront assetsIds={props.assetsIds} info={props.info} />;
};

interface Params extends ParsedUrlQuery {
  uid: string;
}

export const getStaticProps: GetStaticProps<StorefrontProps, Params> = async (
  context
) => {
  const { uid } = context.params!;

  const { data: spaceInfo } = await apolloClient.query<
    { space: Space },
    { spaceIn: string }
  >({
    query: SNAPSHOT_GET_SPACE,
    variables: {
      spaceIn: uid,
    },
  });

  const { data: closedProposals } = await apolloClient.query<
    { proposals: Proposals[] | [] },
    { spaceIn: string; state: string }
  >({
    query: SNAPSHOT_GET_PROPOSALS,
    variables: {
      spaceIn: uid,
      state: "closed",
    },
  });

  const info = {
    name: spaceInfo.space.name,
    id: spaceInfo.space.id,
    nbAsset: closedProposals.proposals.length,
  };

  const assetsIds = closedProposals.proposals
    .filter((proposal) => {
      return (
        proposal.scores[0] > proposal.scores[1] &&
        // @todo: define title format
        proposal.title.match(/ETHEREUM\S+/g)
      );
    })
    .map((proposal) => {
      return proposal.title.match(/ETHEREUM\S+/g)?.[0];
    });

  return {
    props: {
      info,
      assetsIds,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = WHITELISTED_STOREFRONTS.map((uid) => {
    return { params: { uid } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default StorefrontPage;
