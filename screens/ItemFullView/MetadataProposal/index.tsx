export interface MetadataProposalProps {
  description: string;
  external_url?: string;
  image: string;
  name: string;
}

interface MetaProposalProps {
  meta: MetadataProposalProps;
}

const MetadataProposal: React.FC<MetaProposalProps> = ({ meta }) => {
  return (
    <div>
      <h1>{meta.name}</h1>
      <p>{meta.description}</p>
    </div>
  );
};

export default MetadataProposal;
