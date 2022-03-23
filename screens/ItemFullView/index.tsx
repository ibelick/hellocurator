import Link from "next/link";
import { useRouter } from "next/router";
import type { NFT } from "types/rarible";
import MetadataNFT from "./MetadataNFT";
import MetadataProposal from "./MetadataProposal";
import type { MetadataProposalProps } from "./MetadataProposal";

interface ItemFullViewNFT {
  item: NFT;
  isNFT: true;
}

interface ItemFullViewMetadata {
  item: MetadataProposalProps;
  isNFT: false;
}

// type ItemFullViewProps = ItemFullViewNFT & ItemFullViewMetadata;
export type ItemFullViewProps = {
  item: any;
  isNFT?: boolean;
};

const ItemFullView: React.FC<ItemFullViewProps> = ({ item, isNFT }) => {
  const router = useRouter();
  const { uid } = router.query;
  const img = isNFT
    ? { url: item.meta?.content[0].url, alt: item.meta.name }
    : {
        url: item.image.replace("ipfs://", "https://ipfs.io/"),
        alt: item.name,
      };

  return (
    <div>
      <div className="mb-6 inline-block rounded-full bg-white px-4 py-2 text-gray-400 transition hover:bg-gray-100 lg:mb-12">
        <Link href={`/${uid}`}>
          <a>← Back to gallery</a>
        </Link>
      </div>
      <div className="flex flex-col pb-12 lg:flex-row">
        <div className="flex flex-1 items-start justify-center">
          <img
            className="max-h-screen w-full max-w-xl object-contain"
            src={img.url}
            alt={img.alt}
          />
        </div>
        <div className="mt-12 w-full flex-1 pl-0 lg:mt-0 lg:max-w-lg lg:pl-12">
          {isNFT ? (
            <MetadataNFT nft={item as NFT} />
          ) : (
            <MetadataProposal meta={item as MetadataProposalProps} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemFullView;
