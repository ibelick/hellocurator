import NFTGallery from "./NFTGallery";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "components/Button";
import DialogSubmitNFT from "./DialogSubmitNFT";

export interface StorefrontProps {
  assetsIds?: (string | undefined)[];
  info: Info;
}

interface Info {
  id: string;
  name: string;
  nbAsset: number;
}

const Storefront: React.FC<StorefrontProps> = ({ assetsIds, info }) => {
  const router = useRouter();
  const { uid } = router.query;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl  font-bold text-black">{info.name}</h1>
          <h2 className="text-base text-black">{info.id}</h2>
        </div>
        <DialogSubmitNFT
          trigger={<Button type="button">Submit a NFT</Button>}
        />
      </div>
      <div className="mb-4">
        <Link href={`/${uid}/vote`}>Vote</Link>
      </div>
      <div className="mb-8">
        <NFTGallery assetsIds={assetsIds} />
      </div>
    </div>
  );
};

export default Storefront;
