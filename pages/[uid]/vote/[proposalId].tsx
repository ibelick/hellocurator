import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_PROPOSAL } from "lib/queries";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ItemFullView from "screens/ItemFullView";
import type { MetadataProposalProps } from "screens/ItemFullView/MetadataProposal";

interface ProposalPageProps {
  metadata: MetadataProposalProps;
}

const ProposalPage: NextPage<ProposalPageProps> = (props) => {
  return <ItemFullView item={props.metadata} />;
};

interface Params extends ParsedUrlQuery {
  uid: string;
}

export const getServerSideProps: GetServerSideProps<any, Params> = async (
  context
) => {
  const { proposalId } = context.params!;

  const { data } = await apolloClient.query({
    query: SNAPSHOT_GET_PROPOSAL,
    variables: {
      id: proposalId,
    },
  });

  if (!data.proposal) {
    return {
      notFound: true,
    };
  }

  const responseMetadata = await fetch(data.proposal.body);
  const metadata = await responseMetadata.json();

  if (!metadata) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      metadata,
    },
  };
};

export default ProposalPage;
