import { useState, Fragment } from "react";
import { createProposal } from "lib/snapshot";
import TextInput from "components/TextInput";
import Button from "components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Portal from "@radix-ui/react-portal";
import type { NFT } from "types/rarible";

interface DialogSubmitNFTProps {
  trigger: React.ReactNode;
}

const DialogSubmitNFT: React.FC<DialogSubmitNFTProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <div>{trigger}</div>
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
              className="fixed inset-0 z-20 bg-black/50"
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
              className="fixed top-[50%] left-[50%] z-50 w-[95vw] max-w-md -translate-x-[50%] -translate-y-[50%] rounded-lg bg-white p-8 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 md:w-full"
            >
              <div>
                <div className="mb-6 flex flex-col items-center justify-center">
                  <span className="mb-4 text-4xl">💾</span>
                  <DialogPrimitive.Title className="text-lg  font-bold text-black">
                    Submit an item
                  </DialogPrimitive.Title>
                </div>
                <FormSubmitNFT setIsOpen={setIsOpen} />
              </div>
              <DialogPrimitive.Close className="absolute top-3.5 right-3.5">
                ×
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </Portal.Root>
    </DialogPrimitive.Root>
  );
};

interface FormSubmitNFTProps {
  setIsOpen: (isOpen: boolean) => void;
}

type FormValues = {
  contractAddress: string;
  nftId: string;
};

const FormSubmitNFT: React.FC<FormSubmitNFTProps> = ({ setIsOpen }) => {
  const { register, handleSubmit, getValues } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [isNftFetched, setIsNftFetched] = useState(false);
  const [NFT, setNFT] = useState<NFT | null>(null);

  const fetchNftsWithRarible = async () => {
    const { contractAddress, nftId } = getValues();

    const params = `ETHEREUM:${contractAddress}:${nftId}`;

    setIsLoading(true);
    setIsNftFetched(false);
    try {
      const response = await fetch(
        `https://api.rarible.org/v0.1/items/${params}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      setIsNftFetched(true);
      setNFT(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const receipt = await createProposal(data.contractAddress, data.nftId);

      if (receipt) {
        setIsOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!NFT ? (
        <>
          <div className="mb-4">
            <TextInput
              id="contractAddress"
              label="CONTRACT ADDRESS"
              register={register}
              required
            />
          </div>
          <div className="mb-4">
            <TextInput id="nftId" label="NFT ID" register={register} required />
          </div>
          <Button
            type="button"
            onClick={fetchNftsWithRarible}
            isLoading={!isNftFetched && isLoading}
            isBlock
          >
            Preview
          </Button>
        </>
      ) : (
        <div className="my-4 flex">
          <img
            className="h-full max-h-64 w-32 rounded"
            src={NFT.meta?.content[0].url}
            alt={NFT.meta.name}
          />
          <div className="ml-4">
            <p>{NFT.meta.name}</p>
          </div>
        </div>
      )}
      {isNftFetched ? (
        <Button
          type="submit"
          isLoading={isNftFetched && isLoading}
          isBlock
          variant="secondary"
        >
          Submit to vote
        </Button>
      ) : null}
    </form>
  );
};

export default DialogSubmitNFT;
