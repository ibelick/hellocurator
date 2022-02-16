import { useEffect, useState } from "react";
import { getItemById } from "lib/nft";
import type { NFT, Meta } from "types/rarible";

const NFTGallery: React.FC<{ assetsIds?: (string | undefined)[] }> = ({
  assetsIds,
}) => {
  if (!assetsIds) {
    <div>
      <p>
        no gallery yet <span>😢</span>
      </p>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
      {assetsIds?.map((assetId) => {
        return assetId ? <DisplayNFT assetId={assetId} key={assetId} /> : null;
      })}
    </div>
  );
};

const DisplayNFT: React.FC<{ assetId: string }> = ({ assetId }) => {
  const [metadata, setMetadata] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNFT = async () => {
      const item: NFT = await getItemById(assetId);

      setMetadata(item.meta);
      setIsLoading(false);
    };

    fetchNFT();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      {metadata?.content?.[0]["@type"] === "IMAGE" ? (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={metadata?.content[0].url}
            alt={metadata.name}
            className="max-h-full max-w-full"
          />
        </div>
      ) : null}
      <span>{metadata?.name}</span>
    </div>
  );
};

export default NFTGallery;
