import type { NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import { useEffect, useState } from "react";
import { createProposal, castVote } from "lib/snapshot";
import { Web3Provider } from "@ethersproject/providers";
import Storefront from "screens/Storefront";

const Home: NextPage<any> = (props) => {
  console.log("props", props);

  return <Storefront proposals={props.proposals} />;
};

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: SNAPSHOT_GET_PROPOSALS,
  });

  return {
    props: {
      proposals: data.proposals,
    },
  };
}

export default Home;
