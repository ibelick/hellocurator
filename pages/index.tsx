import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_SPACE } from "lib/queries";
import { GetStaticProps, NextPage } from "next";
import Landing from "screens/Landing";
import { Space } from "types/snapshot";
import { WHITELISTED_STOREFRONTS } from "utils/storefront";
import type { LandingProps } from "screens/Landing";

const HomePage: NextPage<LandingProps> = (props) => {
  return <Landing spaces={props.spaces} />;
};

export const getStaticProps: GetStaticProps<any> = async (context) => {
  // @todo: fetch multiples spaces
  const { data } = await apolloClient.query<
    { space: Space },
    { spaceIn: string }
  >({
    query: SNAPSHOT_GET_SPACE,
    variables: {
      spaceIn: WHITELISTED_STOREFRONTS[0],
    },
  });

  return { props: { spaces: data } };
};

export default HomePage;
