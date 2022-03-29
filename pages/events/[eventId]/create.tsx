import type { GetServerSideProps, NextPage } from "next";
import Create from "screens/Create";
import { EVENT_INIT } from "utils/storefront";

const CreatePage: NextPage = () => {
  return <Create />;
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

  return {
    props: {},
  };
};

export default CreatePage;
