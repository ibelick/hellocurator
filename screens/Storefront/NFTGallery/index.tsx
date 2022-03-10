import useNft from "hooks/useNft";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "components/Button";

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
    <div className="mb-6 flex break-inside-avoid flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
      {nft?.meta?.content?.[0]["@type"] === "IMAGE" ? (
        <div className="flex h-full w-full items-center justify-center">
          <Link href={`/${uid}/${assetId.replace("ETHEREUM:", "")}`}>
            <a className="">
              <img
                src={nft?.meta?.content[0].url}
                alt={nft?.meta.name}
                className="h-64 object-contain"
              />
            </a>
          </Link>
        </div>
      ) : null}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="">
          <span className="font-medium">
            {nft?.meta?.name.substring(0, 20) + "..."}
          </span>
          <p className="text-gray-400">Curated by john.eth</p>
        </div>
        <div className="">
          {!nft?.bestSellOrder ? (
            <Button variant="primary" disabled>
              Not listed
            </Button>
          ) : (
            <Button variant="primary">
              Buy for{" "}
              {Number(nft?.bestSellOrder.makePrice).toLocaleString("en-US", {
                minimumFractionDigits: 0,
              }) + " ETH"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTGallery;
