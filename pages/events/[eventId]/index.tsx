import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_SPACE } from "lib/queries";
import { Space } from "types/snapshot";
import Event from "screens/Event";
import type { EventProps } from "screens/Event";
import { ParsedUrlQuery } from "querystring";
import { EVENT_INIT, WHITELISTED_STOREFRONTS } from "utils/storefront";

const EventPage: NextPage<EventProps> = (props) => {
  console.log("props", props);

  return <Event info={props.info} />;
};

interface Params extends ParsedUrlQuery {
  uid: string;
}

export const getStaticProps: GetStaticProps<EventProps, Params> = async (
  context
) => {
  const { eventId } = context.params!;

  const isEventExist = EVENT_INIT.some(
    (event) => event.event_id === eventId && event.date_start
  );

  if (!isEventExist) {
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
      spaceIn: WHITELISTED_STOREFRONTS[0],
    },
  });

  const info = {
    name: spaceInfo.space.name,
    id: spaceInfo.space.id,
  };

  return {
    props: {
      info: spaceInfo,
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

export default EventPage;
