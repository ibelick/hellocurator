import { useState, Fragment } from "react";
import { createProposal } from "lib/snapshot";
import TextInput from "components/TextInput";
import Button from "components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Portal from "@radix-ui/react-portal";
import type { NFT } from "types/rarible";
import { useRouter } from "next/router";

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
              <div>
                <FormSubmitNFT setIsOpen={setIsOpen} />
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
  const [isNftSubmited, setIsNftSubmited] = useState(false);
  const [NFT, setNFT] = useState<NFT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        setError("Failed to preview");
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      // setError(null);
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
        setIsNftSubmited(true);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  if (isNftSubmited) {
    return (
      <div>
        <div className="mb-4 text-center">
          <span className="text-4xl">🙌</span>
          <h2 className="mt-4 text-lg font-bold text-black">
            Item successfuly submitted
          </h2>
        </div>
        <p className="mb-4 text-center">
          People can now vote to decide if it deserve to join the official
          curation!
        </p>
        <Button
          onClick={() => {
            router.push(`/${router.query.uid}/vote`);
            setIsOpen(false);
          }}
          isBlock
        >
          Go to the vote
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!NFT ? (
        <>
          <div className="mb-6 text-center">
            <span className="text-4xl">💾</span>
            <h2 className="mt-4 text-lg font-bold text-black">
              Submit an item
            </h2>
            <p className="mt-2">lorem lorem lorem lorem lorem</p>
          </div>
          <div className="mb-4">
            <TextInput
              id="contractAddress"
              label="CONTRACT ADDRESS"
              placeholder="Enter the contract address"
              register={register}
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              id="nftId"
              label="NFT ID"
              register={register}
              placeholder="Enter the NFT id"
              required
            />
          </div>
          <Button
            type="button"
            onClick={fetchNftsWithRarible}
            isLoading={!isNftFetched && isLoading}
            isBlock
          >
            Preview
          </Button>{" "}
          {error ? (
            <div className="mt-4 flex justify-center font-medium text-red-600">
              <p>{error}</p>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-black">Preview</h2>
          </div>
          <div className="my-4 flex flex-col items-center">
            <img
              className="h-full max-h-96 rounded"
              src={NFT.meta?.content[0].url}
              alt={NFT.meta.name}
            />
            <div className="mt-2 mb-4">
              <p>{NFT.meta.name}</p>
            </div>
          </div>
        </>
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
