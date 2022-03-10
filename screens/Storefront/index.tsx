import NFTGallery from "./NFTGallery";
import HeaderStorefront from "components/HeaderStorefront";
import type { SpaceInfo } from "components/HeaderStorefront";
import Button from "components/Button";

export interface StorefrontProps {
  assetsIds?: (string | undefined)[];
  info: SpaceInfo;
}

const Storefront: React.FC<StorefrontProps> = ({ assetsIds, info }) => {
  return (
    <div>
      <HeaderStorefront info={info} />
      <div className="mb-8">
        <div className="mb-6 break-inside-avoid overflow-hidden rounded-xl bg-gray-100 px-8 py-8">
          <div className="flex">
            <img
              src="https://lh3.googleusercontent.com/mLt8WPerH_XVXXvsPB7osxTZCmfJjKDJa0YhkRBKJcB51rFFoJhZ7lIWNViVYcnAdZpaqn0h8Pt45MjWozOiM30Rnq70kFCvwlV9kA=w600"
              alt="yo"
              className="h-auto w-1/4"
            ></img>

            <div className="w-full py-8 px-12">
              <div className="flex items-center justify-between">
                <div className="">
                  <h2 className="text-2xl font-medium">Suspense 2</h2>
                  <p className="text-gray-400">Curated by nathan.eth</p>
                </div>
                <span>Friday</span>
              </div>

              <div className="h1 mt-8 h-0.5 w-full bg-gray-200"></div>
              <div className="mt-8 flex items-center">
                <div>
                  <p className="text-gray-400">Price</p>
                  <p className="text-2xl">9 ETH</p>
                </div>
                <div className="ml-8">
                  <Button variant="primary">Buy now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="mb-4 text-gray-400">All NFTs</h2>
        <NFTGallery assetsIds={assetsIds} />
      </div>
    </div>
  );
};

export default Storefront;
