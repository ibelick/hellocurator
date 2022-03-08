import useNft from "hooks/useNft";
import Link from "next/link";
import { useRouter } from "next/router";

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
    <div className="columns-1 sm:columns-2 md:columns-3">
      {assetsIds?.map((assetId) => {
        return assetId ? <DisplayNFT assetId={assetId} key={assetId} /> : null;
      })}
    </div>
  );
};

const DisplayNFT: React.FC<{ assetId: string }> = ({ assetId }) => {
  const { nft, isError, isLoading } = useNft(assetId);
  const router = useRouter();
  const { uid } = router.query;

  if (isError) return null;
  if (isLoading) return null;

  return (
    <div className="mb-6 flex break-inside-avoid flex-col overflow-hidden">
      {nft?.meta?.content?.[0]["@type"] === "IMAGE" ? (
        <div className="flex h-full w-full items-center justify-center">
          <Link href={`/${uid}/${assetId.replace("ETHEREUM:", "")}`}>
            <a>
              <img
                src={nft?.meta?.content[0].url}
                alt={nft?.meta.name}
                className="max-h-full max-w-full"
              />
            </a>
          </Link>
        </div>
      ) : null}
      <span className="mt-2">{nft?.meta?.name}</span>
    </div>
  );
};

export default NFTGallery;
