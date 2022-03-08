import Link from "next/link";
import { useRouter } from "next/router";
import { truncateEthAddress } from "utils/ethereum";
import ReactMarkdown from "react-markdown";
import Button from "components/Button";
import { useEnsLookup } from "wagmi";
import React, { useState } from "react";
import type { NFT } from "types/rarible";

export interface NFTFullViewProps {
  nft: NFT;
}

const NFTFullView: React.FC<NFTFullViewProps> = ({ nft }) => {
  const router = useRouter();
  const { uid } = router.query;
  const [showMore, setShowMore] = useState(false);
  const [{ data: dataEns }] = useEnsLookup({
    address: nft ? nft.creators[0].account.replace("ETHEREUM:", "") : undefined,
  });

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
            src={nft.meta?.content[0].url}
            alt={nft.meta.name}
          />
        </div>
        <div className="mt-12 w-full flex-1 pl-0 lg:mt-0 lg:max-w-lg lg:pl-12">
          <div className="mb-4">
            <h2 className="mb-2 text-4xl">{nft.meta.name}</h2>
            <div className="prose mb-4 mt-4">
              {showMore ? (
                <ReactMarkdown>{nft.meta.description}</ReactMarkdown>
              ) : (
                `${nft.meta.description.substring(0, 250)}... ${" "}`
              )}
              {nft.meta.description.length > 250 && (
                <div className="inline">
                  <button
                    className="text-gray-400"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show less" : "Show more"}
                  </button>
                </div>
              )}
            </div>
            <div>
              <a
                href={`https://rarible.com/token/${nft.id.replace(
                  "ETHEREUM:",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 mr-2 text-gray-400 sm:mb-0"
              >
                View on Rarible
              </a>
            </div>
            <div className="mt-8 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
              <div>
                <p className="text-gray-400">PRICE</p>
                <p className="text-2xl">
                  {!nft.bestSellOrder
                    ? "Not listed yet"
                    : Number(nft.bestSellOrder.makePrice).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 0,
                        }
                      ) + " ETH"}
                </p>
                <p className="text-gray-400">
                  {!nft.bestSellOrder
                    ? "Come back soon"
                    : "= " +
                      Number(nft.bestSellOrder.makePriceUsd).toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                        }
                      )}
                </p>
              </div>
              {nft.bestSellOrder ? (
                <div className="h-auto">
                  <Button variant="primary" disabled>
                    Buy now
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-12">
            <p className="font-medium">Created by</p>
            <div className="mt-2 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-700 to-red-200"></div>
              <a
                href={`https://rarible.com/user/${nft.creators[0].account.replace(
                  "ETHEREUM:",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                {!dataEns
                  ? truncateEthAddress(
                      nft.creators[0].account.replace("ETHEREUM:", "")
                    )
                  : dataEns}
              </a>
            </div>
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
          <div className="mt-12">
            <p className="mb-4 text-sm font-medium text-gray-400">
              NFT DETAILS
            </p>
            <ul>
              <li className="mb-6 flex justify-between">
                <p className="font-medium">Contract address</p>

                <a
                  className="flex"
                  href={`https://etherscan.io/address/${nft.contract.replace(
                    "ETHEREUM:",
                    ""
                  )}`}
                  target="_blank"
                >
                  <p>
                    {truncateEthAddress(nft.contract.replace("ETHEREUM:", ""))}
                  </p>
                  <img src="/arrow-up-right.svg" className="ml-2 h-6 w-6"></img>
                </a>
              </li>
              <li className="mb-6 flex justify-between">
                <p className="font-medium">Token ID</p>
                <div className="flex">
                  <p>{nft.tokenId}</p>
                </div>
              </li>
              <li className="mb-6 flex justify-between">
                <p className="font-medium">Blockchain</p>
                <p>{nft.blockchain}</p>
              </li>
            </ul>
          </div>
          {nft.meta.attributes.length ? (
            <div className="mt-12">
              <p className="mb-4  text-sm font-medium text-gray-400">
                PROPERTIES
              </p>
              <div className="mb-4 flex flex-wrap gap-4">
                {nft.meta.attributes.map((attribute, index) => {
                  return (
                    <div
                      className="flex flex-col rounded bg-gray-100 p-4 "
                      key={`${attribute.key}-${index}`}
                    >
                      <span className="font-medium text-gray-400">
                        {attribute.key}
                      </span>
                      <span>{attribute.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NFTFullView;
