import type { GetServerSideProps, NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_SPACE } from "lib/queries";
import { Space } from "types/snapshot";
import { EVENT_INIT, WHITELISTED_STOREFRONTS } from "utils/storefront";
import Create from "screens/Create";
import type { CreateProps } from "screens/Create";

const CreatePage: NextPage<{ info: CreateProps }> = ({ info }) => {
  return <Create {...info} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  return {
    props: {
      info: {
        minScore: spaceInfo.space.filters.minScore,
        symbol: spaceInfo.space.symbol,
      },
    },
  };
};

export default CreatePage;
