import Button from "components/Button";
import Link from "next/link";
import React from "react";
import DialogSubmitNFT from "./DialogSubmitNFT";
import { useRouter } from "next/router";

export interface SpaceInfo {
  id: string;
  name: string;
}

const HeaderStorefront: React.FC<{ info: SpaceInfo }> = ({ info }) => {
  const router = useRouter();

  const { uid } = router.query;

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="mb-2 text-3xl  font-bold text-black">{info.name}</h1>
        <h2 className="text-base text-black">{info.id}</h2>
      </div>
      <div className="flex items-center">
        {router.pathname === "/[uid]" ? (
          <Link href={`/${uid}/vote`}>
            <a className="mr-4">Vote</a>
          </Link>
        ) : (
          <Link href={`/${uid}`}>
            <a className="mr-4">Gallery</a>
          </Link>
        )}
        <DialogSubmitNFT
          trigger={<Button type="button">Submit a NFT</Button>}
        />
      </div>
    </div>
  );
};

export default HeaderStorefront;
