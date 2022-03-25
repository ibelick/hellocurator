import { GetServerSideProps, NextPage } from "next";
import { EVENT_INIT } from "utils/storefront";

const SpacePage: NextPage = () => {
  return <span></span>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.params!;

  const isSpaceExist = EVENT_INIT.some((event) => event.creator_id === uid);

  if (!isSpaceExist) {
    return {
      notFound: true,
    };
  }

  const lastEventPath = EVENT_INIT.find(
    (event) => event.creator_id === "loopclub.eth"
  )?.event_id;

  return {
    redirect: {
      destination: `${uid}/${lastEventPath}`,
      permanent: false,
    },
  };
};

export default SpacePage;
