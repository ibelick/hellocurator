import Button from "components/Button";
import Link from "next/link";
import { useConnect, useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import DialogSubmitNFT from "./DialogSubmitNFT";
import { useRouter } from "next/router";

export interface SpaceInfo {
  id: string;
  name: string;
}

const HeaderStorefront: React.FC<{ info: SpaceInfo }> = ({ info }) => {
  const router = useRouter();
  const { uid } = router.query;
  const [{ data: accountData }] = useAccount();
  const linkSelectedCn = `font-bold text-pink-400 underline decoration-pink-400 decoration-2 decoration-4 underline-offset-4`;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl  font-bold text-black">{info.name}</h1>
          <h2 className="text-base text-gray-400">{info.id}</h2>
        </div>
        <div className="flex items-center">
          <DialogSubmitNFT
            trigger={
              <Button type="button" disabled={!Boolean(accountData?.address)}>
                Submit a NFT
              </Button>
            }
          />
        </div>
      </div>
      <div className="mb-4 flex w-full justify-center">
        <Link href={`/${uid}`}>
          <a
            className={`mr-8 ${
              router.pathname === "/[uid]"
                ? linkSelectedCn
                : `underline decoration-transparent decoration-4 underline-offset-2`
            }`}
          >
            Gallery
          </a>
        </Link>
        <Link href={`/${uid}/vote`}>
          <a
            className={`${
              router.pathname === "/[uid]/vote"
                ? linkSelectedCn
                : `underline decoration-transparent decoration-4 underline-offset-2`
            }`}
          >
            Vote
          </a>
        </Link>
      </div>
    </>
  );
};

export default HeaderStorefront;
