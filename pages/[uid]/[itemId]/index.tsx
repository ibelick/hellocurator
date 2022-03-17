import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import type { Proposals } from "types/snapshot";
import { ParsedUrlQuery } from "querystring";
import { WHITELISTED_STOREFRONTS } from "utils/storefront";
import { getItemById } from "lib/nft";
import NFTFullView from "screens/NFTFullView";
import type { NFTFullViewProps } from "screens/NFTFullView";

const ItemPage: NextPage<NFTFullViewProps> = ({ nft }) => {
  return <NFTFullView nft={nft} />;
};

interface Params extends ParsedUrlQuery {
  uid: string;
  itemId?: string;
}

export const getStaticProps: GetStaticProps<NFTFullViewProps, Params> = async (
  context
) => {
  const { itemId } = context.params!;

  const nft = await getItemById(`ETHEREUM:${itemId}`);

  return {
    props: {
      nft,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data: closedProposals } = await apolloClient.query<
    { proposals: Proposals[] | [] },
    { spaceIn: string; state: string }
  >({
    query: SNAPSHOT_GET_PROPOSALS,
    variables: {
      spaceIn: WHITELISTED_STOREFRONTS[0],
      state: "closed",
    },
  });

  const assetsIds = closedProposals.proposals
    .filter((proposal) => {
      return (
        proposal.scores[0] > proposal.scores[1] &&
        proposal.title.match(/ETHEREUM\S+/g)
      );
    })
    .map((proposal) => {
      return proposal.title
        .match(/ETHEREUM\S+/g)?.[0]
        .replace("ETHEREUM:", "")
        .replace("/", "");
    });

  const paths = assetsIds.map((itemId) => {
    return {
      params: {
        uid: WHITELISTED_STOREFRONTS[0],
        itemId,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default ItemPage;
