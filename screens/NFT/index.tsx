import useNft from "hooks/useNft";
import Link from "next/link";
import { useRouter } from "next/router";
import { truncateEthAddress } from "utils/ethereum";
import ReactMarkdown from "react-markdown";

const NFT = () => {
  const router = useRouter();
  const { itemId, uid } = router.query;
  const { nft, isError, isLoading } = useNft(`ETHEREUM:${itemId}`);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!nft || isError) {
    return <p>failed to fetch</p>;
  }

  return (
    <div>
      <div className="mb-6 lg:mb-12">
        <Link href={`/${uid}`}>
          <a>← Back to gallery</a>
        </Link>
      </div>
      <div className="flex flex-col pb-12 lg:flex-row">
        <div className="flex flex-1 justify-center">
          <img
            className="max-h-96 w-full rounded object-contain"
            src={nft.meta?.content[0].url}
            alt={nft.meta.name}
          />
        </div>
        <div className="mt-12 w-full flex-1 pl-0 lg:mt-0 lg:max-w-lg lg:pl-12">
          <div className="mb-4 border-b-2">
            <h2 className="mb-2 text-3xl">{nft.meta.name}</h2>
            <div className="prose mb-4">
              <ReactMarkdown>{nft.meta.description}</ReactMarkdown>
            </div>
          </div>
          <div className="mb-2">
            <p className="font-medium">Created by</p>
            <a
              href={`https://rarible.com/user/${nft.creators[0].account.replace(
                "ETHEREUM:",
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {truncateEthAddress(
                nft.creators[0].account.replace("ETHEREUM:", "")
              )}
            </a>
          </div>
          {nft.owners.length ? (
            <div className="mb-2">
              <p className="font-medium">Owned by</p>
              <a
                href={`https://rarible.com/user/${nft.creators[0].account.replace(
                  "ETHEREUM:",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {truncateEthAddress(
                  nft.owners[0].account.replace("ETHEREUM:", "")
                )}
              </a>
            </div>
          ) : null}
          {nft.meta.attributes.length ? (
            <div className="mt-4">
              <p className="mb-2 font-medium">PROPERTIES</p>
              <div className="mb-4 flex flex-wrap gap-4 ">
                {nft.meta.attributes.map((attribute) => {
                  return (
                    <div
                      className="flex flex-col rounded border p-2"
                      key={attribute.key}
                    >
                      <span className="font-medium text-primary-800">
                        {attribute.key}
                      </span>
                      <span>{attribute.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div>
            <a
              href={`https://rarible.com/token/${nft.id.replace(
                "ETHEREUM:",
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 mr-2 sm:mb-0"
            >
              View on Rarible
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFT;
