import type { GetServerSideProps, NextPage } from "next";
import Create from "screens/Create";
import { EVENT_INIT } from "utils/storefront";

const CreatePage: NextPage = () => {
  return <Create />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.params!;

  const isSpaceExist = EVENT_INIT.some(
    (event) => event.creator_id === uid && event.date_start
  );

  if (!isSpaceExist) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default CreatePage;
