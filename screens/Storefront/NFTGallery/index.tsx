import { useEffect, useState } from "react";
import { getItemById } from "lib/nft";
import type { NFT, Meta } from "types/rarible";

const NFTGallery: React.FC<{ assets: (string | undefined)[] }> = ({
  assets,
}) => {
  if (!assets) {
    <div>
      <p>
        no gallery yet <span>😢</span>
      </p>
    </div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {assets.map((asset) => {
        return asset ? <DisplayNFT itemId={asset} key={asset} /> : null;
      })}
    </div>
  );
};

const DisplayNFT: React.FC<{ itemId: string }> = ({ itemId }) => {
  const [metadata, setMetadata] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNFT = async () => {
      const item: NFT = await getItemById(itemId);

      setMetadata(item.meta);
      setIsLoading(false);
    };

    fetchNFT();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="overflow-hidden">
      {metadata?.content?.[0]["@type"] === "IMAGE" ? (
        <img src={metadata?.content[0].url} alt={metadata.name} />
      ) : null}
      <span>{metadata?.name}</span>
    </div>
  );
};

export default NFTGallery;
