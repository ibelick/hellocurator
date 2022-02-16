import useNft from "hooks/useNft";

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
  const { nft, isError, isLoading } = useNft(assetId);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col overflow-hidden">
      {nft?.meta?.content?.[0]["@type"] === "IMAGE" ? (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={nft?.meta?.content[0].url}
            alt={nft?.meta.name}
            className="max-h-full max-w-full"
          />
        </div>
      ) : null}
      <span>{nft?.meta?.name}</span>
    </div>
  );
};

export default NFTGallery;
