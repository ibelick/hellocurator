import { useState } from "react";
import { oldCreateProposal } from "lib/snapshot";
import TextInput from "components/TextInput";
import Button from "components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Dialog from "components/Dialog";
import type { NFT } from "types/rarible";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

interface DialogSubmitNFTProps {
  setCreateProposalReceiptId: (createProposalReceiptId: string) => void;
}

const DialogSubmitNFT: React.FC<DialogSubmitNFTProps> = ({
  setCreateProposalReceiptId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ data: accountData }] = useAccount();

  return (
    <Dialog
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      trigger={
        <Button type="button" disabled={!Boolean(accountData?.address)}>
          Submit an NFT
        </Button>
      }
    >
      <FormSubmitNFT
        setIsOpen={setIsOpen}
        setCreateProposalReceiptId={setCreateProposalReceiptId}
      />
    </Dialog>
  );
};

interface FormSubmitNFTProps {
  setIsOpen: (isOpen: boolean) => void;
  setCreateProposalReceiptId: (createProposalReceiptId: string) => void;
}

type FormValues = {
  nftLink: string;
};

const extractItemIdFromLink = (nftLink: string) => {
  if (nftLink.includes("rarible.com")) {
    const stringFrom = "token/";
    return nftLink
      .substring(nftLink.indexOf(stringFrom) + stringFrom.length)
      .split("?")[0];
  }

  if (nftLink.includes("opensea.io")) {
    const stringFrom = "assets/";

    return nftLink
      .substring(nftLink.indexOf(stringFrom) + stringFrom.length)
      .replace("/", ":");
  }

  return null;
};

const FormSubmitNFT: React.FC<FormSubmitNFTProps> = ({
  setIsOpen,
  setCreateProposalReceiptId,
}) => {
  const { register, handleSubmit, getValues } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [isNftFetched, setIsNftFetched] = useState(false);
  const [isNftSubmited, setIsNftSubmited] = useState(false);
  const [NFT, setNFT] = useState<NFT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchNftsWithRarible = async () => {
    const { nftLink } = getValues();

    const itemId = extractItemIdFromLink(nftLink);

    if (!itemId) {
      setError("Bad link format");
      return;
    }

    const params = `ETHEREUM:${itemId}`;

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

      setError(null);
      setIsNftFetched(true);
      setNFT(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    const itemId = extractItemIdFromLink(data.nftLink);

    if (!itemId) {
      setError("Something went wrong");
      throw new Error("Something went wrong");
    }

    try {
      const receipt = await oldCreateProposal(itemId);

      if (receipt) {
        setIsNftSubmited(true);

        // @ts-ignore
        setCreateProposalReceiptId(receipt.id as string);
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
          </div>
          <div className="mb-4">
            <TextInput
              id="nftLink"
              label="Link from Rarible or OpenSea"
              placeholder="ex: https://rarible.com/token/0x480894ceedc8ff63b6db624568f666e634dc8623:1"
              register={register}
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
