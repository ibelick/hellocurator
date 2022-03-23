import Button from "components/Button";

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
      <div className="mb-4 flex items-center justify-between">
        <p>Voting ends in</p>
        <p className="text-xl font-medium">00:23:00</p>
      </div>
      <div className="h-0.5 w-full bg-gray-100"></div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold">Subjectivity</h1>
        <p className="mb-8">
          for <span className="text-primary-800">“Freedom of lands”</span> by{" "}
          <span className="text-primary-800">UkraineDAO</span>
        </p>
        <div className="mb-8 flex items-center">
          <div className="mr-2 h-6 w-6 rounded-full bg-gradient-to-r from-blue-700 to-red-200"></div>
          <p className="">Submitted by john.eth</p>
        </div>
        <p>
          The world’s first and largest digital marketplace for crypto
          collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
          exclusive digital items.
        </p>
      </div>
      <div className="mt-8 w-full rounded-xl border border-gray-200 bg-white p-6 shadow transition hover:bg-gray-100">
        <div>
          <p className="text-gray-400">Total votes</p>
          <p className="font-lg text-lg font-medium text-primary-800">
            548 LOVES
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-gray-50 px-4 py-2">
        <p>
          Your voting power: <span className="text-primary-800">500 LOVE</span>
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <Button variant="secondary">Share the image</Button>
        <Button variant="primary">See all submissions</Button>
      </div>
    </div>
  );
};

export default MetadataProposal;
