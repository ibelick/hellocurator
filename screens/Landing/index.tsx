import Link from "next/link";
import Button from "components/Button";
import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Portal from "@radix-ui/react-portal";
import { useState, Fragment } from "react";
import { Space } from "types/snapshot";

export interface LandingProps {
  spaces: Spaces;
}

interface Spaces {
  space: Space;
}

const Landing: React.FC<LandingProps> = ({ spaces }) => {
  return (
    <div>
      <div className="flex-none items-center justify-between md:flex">
        <div>
          <h2 className="text-xl font-bold">Popular galleries</h2>
          <p className="mb-4 text-gray-400 md:mb-8">
            Explore galleries curated by communities
          </p>
        </div>
        <div className="mb-4 md:mb-0">
          <DialogCreateSpace />
        </div>
      </div>
      <div className="flex-none md:flex">
        <Link href="/loopclub.eth">
          <a className="mb-4 block md:mb-0">
            <div className="mr-4 w-full rounded-xl border border-gray-200 bg-white p-8 shadow transition hover:bg-gray-100 md:w-72">
              <img
                className="mb-4 w-14 rounded-full"
                src={spaces.space.avatar.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
                )}
                alt={spaces.space.name}
              />
              <h3 className="text-mb-1 mt-2 text-xl font-bold">
                {spaces.space.name}
              </h3>
              <p className="text-gray-400">{spaces.space.id}</p>
            </div>
          </a>
        </Link>
        <Link href="/loopclub.eth">
          <a className="block">
            <div className="relative mr-4 w-full rounded-xl border border-gray-200 bg-white p-8 shadow transition hover:bg-gray-100 md:w-72">
              <span className="absolute top-4 right-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-400">
                SOON
              </span>
              <img
                className="mb-4 w-14 rounded-full"
                src="https://pbs.twimg.com/profile_images/1490688819900919815/mSx79mUo_400x400.jpg"
                alt={spaces.space.name}
              />
              <h3 className="text-mb-1 mt-2 text-xl font-bold">Playgrounds</h3>
              <p className="text-gray-400">playgrounds.wtf</p>
            </div>
          </a>
        </Link>
      </div>
      <div className="mt-8 h-0.5 w-full bg-gray-100"></div>
      <div className="mt-8 rounded-xl bg-gray-100 p-10">
        <div>
          <h2 className="mb-2 text-xl font-bold">
            🦖 Powered by Playgrounds.wtf
          </h2>
          <p className="mb-4 mr-24 text-gray-400">
            We’re a community of builders, creators and adventurers building
            cool shit with crypto and web3, guided by principles of openness,
            curiosity and play. We aim to build public goods for the future that
            create and sustain an equitable, open Metaverse for all.
          </p>
        </div>
        <div className="w-full flex-none md:flex">
          <span className="mr-2">
            <Button variant="tertiary">Visit website</Button>
          </span>
          <span>
            <Button variant="tertiary">Join Discord</Button>
          </span>
        </div>
      </div>
    </div>
  );
};

const DialogCreateSpace = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <div>
          <Button>Create space</Button>
        </div>
      </DialogPrimitive.Trigger>
      <Portal.Root>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-white/80"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className="fixed top-[50%] left-[50%] z-50 w-[95vw] max-w-md -translate-x-[50%] -translate-y-[50%] rounded-lg border border-gray-200 bg-white p-10 shadow-xl focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 md:w-full"
            >
              {/* @todo: */}
              <div className="mb-6 text-center">
                <span className="text-4xl">🦖</span>
                <h2 className="mt-4 text-lg font-bold text-black">
                  Want to start a gallery? Join our Discord
                </h2>
                <p className="mt-2">
                  We are currently building hellocurator as part of
                  Playgrounds.wtf, join our Discord and #loopclub channel to
                  engage with us!
                </p>
                <div className="mt-4 flex justify-center">
                  <Button>Join Discord</Button>
                </div>
              </div>
              <DialogPrimitive.Close className="absolute top-5 right-5">
                <span className="text-2xl">×</span>
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </Portal.Root>
    </DialogPrimitive.Root>
  );
};

export default Landing;
