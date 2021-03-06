import { truncateEthAddress } from "utils/ethereum";
import ReactMarkdown from "react-markdown";
import Button from "components/Button";
import { useEnsLookup } from "wagmi";
import React, { useState } from "react";
import type { NFT } from "types/rarible";
import { useAccount } from "wagmi";

interface MetadataProps {
  nft: NFT;
}

const Metadata: React.FC<MetadataProps> = ({ nft }) => {
  const [showMore, setShowMore] = useState(false);
  const [{ data: dataEns }] = useEnsLookup({
    address: nft ? nft.creators[0].account.replace("ETHEREUM:", "") : undefined,
  });
  const creatorAddress = nft.creators[0].account.replace("ETHEREUM:", "");
  const contractAddress = nft.contract.replace("ETHEREUM:", "");

  return (
    <div>
      <div className="mb-4">
        <h2 className="mb-2 text-4xl">{nft.meta.name}</h2>
        {nft.meta.description ? (
          <div className="prose mb-4 mt-4">
            {showMore ? (
              <ReactMarkdown>{nft.meta.description}</ReactMarkdown>
            ) : (
              `${nft.meta.description.substring(0, 250)}${
                nft.meta.description.length > 250 ? `...` : ``
              } ${" "}`
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
        ) : null}
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
        <CardCTA
          sellerAddress={creatorAddress}
          makePrice={nft?.bestSellOrder?.makePrice}
          makePriceUsd={nft?.bestSellOrder?.makePriceUsd}
        />
      </div>
      <div className="mt-12">
        <p className="font-medium">Created by</p>
        <div className="mt-2 flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-700 to-red-200"></div>
          <a
            href={`https://rarible.com/user/${creatorAddress}`}
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
            // @todo: replace by owner when available in API
            href={`https://rarible.com/user/${creatorAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncateEthAddress(creatorAddress)}
          </a>
        </div>
      ) : null}
      <div className="mt-12">
        <p className="mb-4 text-sm font-medium text-gray-400">item DETAILS</p>
        <ul>
          <li className="mb-6 flex justify-between">
            <p className="font-medium">Contract address</p>

            <a
              className="flex"
              href={`https://etherscan.io/address/${contractAddress}`}
              target="_blank"
            >
              <p>{truncateEthAddress(contractAddress)}</p>
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
          <p className="mb-4  text-sm font-medium text-gray-400">PROPERTIES</p>
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
  );
};

interface CardCTAProps {
  sellerAddress: string;
  makePrice?: string;
  makePriceUsd?: string;
}

const CardCTA: React.FC<CardCTAProps> = ({
  sellerAddress,
  makePrice,
  makePriceUsd,
}) => {
  const [{ data: accountData }] = useAccount();
  const isUserNft =
    sellerAddress.toUpperCase() === accountData?.address.toUpperCase();

  return (
    <div className="mt-8 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex flex-col items-start">
        <p className="text-gray-400">PRICE</p>
        {!makePrice ? (
          <>
            <p className="text-2xl">Not listed yet</p>
            <p className="text-gray-400">Come back soon</p>
          </>
        ) : (
          <>
            <p className="text-2xl">
              {`${Number(makePrice).toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })} ETH`}
            </p>
            {!makePriceUsd ? null : (
              <p className="text-gray-400">{`= ${Number(
                makePriceUsd
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              })}`}</p>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col">
        {!isUserNft ? (
          <div className="h-auto">
            <Button variant="primary" disabled>
              Buy now
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Metadata;
