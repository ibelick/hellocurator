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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Popular galleries</h2>
        <DialogCreateSpace />
      </div>
      <div className="flex">
        <Link href="/loopclub.eth">
          <a className="block">
            <div className="w-72 rounded border border-gray-100 p-4 shadow-sm">
              <img
                className="w-16"
                src={spaces.space.avatar.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
                )}
                alt={spaces.space.name}
              />
              <h3 className="mb-1 font-medium">{spaces.space.name}</h3>
              {spaces.space.id}
            </div>
          </a>
        </Link>
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
              <div>text for reach us on discord to be withlisted</div>
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
