import NFTGallery from "./NFTGallery";
import HeaderStorefront from "components/HeaderStorefront";
import type { SpaceInfo } from "components/HeaderStorefront";

export interface StorefrontProps {
  assetsIds?: (string | undefined)[];
  info: SpaceInfo;
}

const Storefront: React.FC<StorefrontProps> = ({ assetsIds, info }) => {
  return (
    <div>
      <HeaderStorefront info={info} />
      <div className="mb-8">
        <NFTGallery assetsIds={assetsIds} />
      </div>
    </div>
  );
};

export default Storefront;
