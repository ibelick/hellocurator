import Link from "next/link";
import Button from "components/Button";
import { useState } from "react";
import { Space } from "types/snapshot";
import Dialog from "components/Dialog";

export interface LandingProps {
  spaces: Spaces;
}

interface Spaces {
  space: Space;
}

const DISCORD_LINK = "https://discord.com/invite/eT5hD56Brt";

const Landing: React.FC<LandingProps> = ({ spaces }) => {
  return (
    <div>
      <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
        <div className="mb-2 md:mb-0">
          <h2 className="text-xl font-bold">Popular galleries</h2>
          <p className="text-gray-400">
            Explore galleries curated by communities
          </p>
        </div>
        <DialogCreateSpace />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <CardSpace
          href="loopclub.eth"
          name={spaces.space.name}
          id={spaces.space.id}
          imgSrc={spaces.space.avatar.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          )}
        />
        <CardSpace
          name="Playgrounds"
          id="playgrounds.wtf"
          imgSrc="https://pbs.twimg.com/profile_images/1490688819900919815/mSx79mUo_400x400.jpg"
          isSoon
        />
      </div>
      <div className="mt-8 h-0.5 w-full bg-gray-100"></div>
      <div className="mt-8 rounded-xl bg-gray-100 p-10">
        <div>
          <h2 className="mb-2 text-xl font-bold">
            🦖 Powered by Playgrounds.wtf
          </h2>
          <p className="mb-4 text-gray-400">
            We’re a community of builders, creators and adventurers building
            cool shit with crypto and web3, guided by principles of openness,
            curiosity and play. We aim to build public goods for the future that
            create and sustain an equitable, open Metaverse for all.
          </p>
        </div>
        <div className="flex w-full flex-col sm:flex-row">
          <a
            href="https://playgrounds.wtf/"
            target="_blank"
            rel="noopener"
            className="mb-4 mr-2 sm:mb-0"
          >
            <Button variant="tertiary">Visit website</Button>
          </a>
          <a href={DISCORD_LINK} target="_blank" rel="noopener">
            <Button variant="tertiary">Join Discord</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

interface CardSpaceProps {
  href?: string;
  name: string;
  id: string;
  imgSrc: string;
  isSoon?: boolean;
}

const CardSpace: React.FC<CardSpaceProps> = ({
  href = "",
  name,
  id,
  imgSrc,
  isSoon,
}) => {
  return (
    <Link href={`/${href}`}>
      <a className="block">
        <div className="relative w-full rounded-xl border border-gray-200 bg-white p-8 shadow transition hover:bg-gray-100 md:w-72">
          {isSoon ? (
            <span className="absolute top-4 right-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-400">
              SOON
            </span>
          ) : null}
          <img className="mb-4 w-14 rounded-full" src={imgSrc} alt={name} />
          <h3 className="text-mb-1 mt-2 text-xl font-bold">{name}</h3>
          <p className="text-gray-400">{id}</p>
        </div>
      </a>
    </Link>
  );
};

const DialogCreateSpace = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      trigger={<Button>Create space</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="text-center">
        <span className="text-4xl">🦖</span>
        <h2 className="mt-4 text-lg font-bold text-black">
          Want to start a gallery? Join our Discord
        </h2>
        <p className="mt-2">
          We are currently building hellocurator as part of Playgrounds.wtf,
          join our Discord and #loopclub channel to engage with us!
        </p>
        <div className="mt-4 flex justify-center">
          <a href={DISCORD_LINK} target="_blank" rel="noopener">
            <Button>Join Discord</Button>
          </a>
        </div>
      </div>
    </Dialog>
  );
};

export default Landing;
