import { GetServerSideProps, NextPage } from "next";
import { EVENT_INIT, WHITELISTED_STOREFRONTS } from "utils/storefront";

const SpacePage: NextPage = () => {
  return <span></span>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const isSpaceExist = EVENT_INIT.some(
  //   (event) => event.creator_id === uid && event.date_start
  // );

  // if (!isSpaceExist) {
  //   return {
  //     notFound: true,
  //   };
  // }

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
