import { GetServerSideProps, NextPage } from "next";
import { EVENT_INIT, WHITELISTED_STOREFRONTS } from "utils/storefront";

const SpacePage: NextPage = () => {
  return <span></span>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const hasEvent = Boolean(EVENT_INIT[0].event_id && EVENT_INIT[0].date_start);

  if (!hasEvent) {
    return {
      notFound: true,
    };
  }

  const lastEventPath = EVENT_INIT.find(
    (event) => event.creator_id === WHITELISTED_STOREFRONTS[0]
  )?.event_id;

  return {
    redirect: {
      destination: `/events/${lastEventPath}`,
      permanent: false,
    },
  };
};

export default SpacePage;
