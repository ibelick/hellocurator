import NFTGallery from "./NFTGallery";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "components/Button";
import DialogSubmitNFT from "./DialogSubmitNFT";

export interface StorefrontProps {
  assetsIds?: (string | undefined)[];
}

const Storefront: React.FC<StorefrontProps> = ({ assetsIds }) => {
  const router = useRouter();
  const { uid } = router.query;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Link href={`/${uid}/vote`}>Vote</Link>
        <DialogSubmitNFT
          trigger={<Button type="button">Submit a NFT</Button>}
        />
      </div>
      <div className="mb-8">
        <NFTGallery assetsIds={assetsIds} />
      </div>
    </div>
  );
};

export default Storefront;
