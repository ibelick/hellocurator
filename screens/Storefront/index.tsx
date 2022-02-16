import NFTGallery from "./NFTGallery";
import Link from "next/link";
import SubmitNFT from "./SubmitNFT";
import { useRouter } from "next/router";

export interface StorefrontProps {
  assetsIds?: (string | undefined)[];
}

const Storefront: React.FC<StorefrontProps> = ({ assetsIds }) => {
  const router = useRouter();
  const { uid } = router.query;

  return (
    <>
      <Link href={`/${uid}/vote`}>Vote</Link>
      <div className="mb-8">
        <NFTGallery assetsIds={assetsIds} />
      </div>
      {/* <div>
        <h2 className="mb-6 text-2xl">Submit an NFT</h2>
        <SubmitNFT />
      </div>
      */}
    </>
  );
};

export default Storefront;
