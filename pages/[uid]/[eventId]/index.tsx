import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_SPACE } from "lib/queries";
import { Space } from "types/snapshot";
import Vote from "screens/Vote";
import type { VoteProps } from "screens/Vote";
import { ParsedUrlQuery } from "querystring";
import { EVENT_INIT } from "utils/storefront";

const VotePage: NextPage<VoteProps> = (props) => {
  return <Vote info={props.info} />;
};

interface Params extends ParsedUrlQuery {
  uid: string;
}

export const getStaticProps: GetStaticProps<VoteProps, Params> = async (
  context
) => {
  const { uid } = context.params!;

  const isSpaceExist = EVENT_INIT.some(
    (event) => event.creator_id === uid && event.date_start
  );

  if (!isSpaceExist) {
    return {
      notFound: true,
    };
  }

  const { data: spaceInfo } = await apolloClient.query<
    { space: Space },
    { spaceIn: string }
  >({
    query: SNAPSHOT_GET_SPACE,
    variables: {
      spaceIn: uid,
    },
  });

  const info = {
    name: spaceInfo.space.name,
    id: spaceInfo.space.id,
  };

  return {
    props: {
      info,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = EVENT_INIT.map((event) => {
    return { params: { uid: event.creator_id, eventId: event.event_id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default VotePage;
