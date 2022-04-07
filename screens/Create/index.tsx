import { useState } from "react";
import Button from "components/Button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "components/TextInput";
import FileInput from "components/FileInput";
import { createProposal } from "lib/snapshot";
import Textarea from "components/Textarea";
import { isFileImage } from "utils/file";
import useIpfs from "hooks/useIpfs";
import { useRouter } from "next/router";
import Dialog from "components/Dialog";
import Spinner from "components/Spinner";
import { SPACE_INIT } from "utils/storefront";
import useVotingPower from "hooks/useVotingPower";
import { compress } from "utils/image";

export interface CreateProps {
  minScore: number;
  symbol: string;
}

type FormValues = {
  image: FileList;
  name: string;
  description: string;
};

type Receipt = {
  id: string;
};

const Create: React.FC<CreateProps> = ({ minScore, symbol }) => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isImageSubmited, setIsImageSubmited] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<null | Receipt>(null);
  const router = useRouter();
  const { eventId } = router.query;
  const { image, name } = watch();
  const { upload } = useIpfs();
  const { userVotingPower } = useVotingPower();
  const isUserCanSubmit = Boolean(
    userVotingPower && userVotingPower > 0 && userVotingPower >= minScore
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setIsError(false);
    setReceipt(null);
    const file = data.image[0];
    const compressedFile = await compress(file, 0.6, 2000, 2000, 1000);

    try {
      const imageUploaded = await upload(compressedFile);

      if (!imageUploaded) {
        setIsError(true);
        return;
      }

      const jsonMetadata = JSON.stringify({
        name: data.name,
        description: data.description,
        image: `ipfs://ipfs/${imageUploaded.hash}`,
        external_url: "",
        animation_url: `ipfs://ipfs/${imageUploaded.hash}`,
      });

      const metadata = await upload(jsonMetadata);

      if (!metadata) {
        setIsError(true);
        return;
      }

      const receipt = await createProposal(imageUploaded.url, metadata.url);

      if (!receipt) {
        setIsError(true);
        return;
      }

      // @ts-ignore
      setReceipt(receipt);
      setIsImageSubmited(true);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Dialog isOpen={isLoading}>
        <div className="flex flex-col text-center">
          <span className="flex w-full justify-center">
            <Spinner variant="tertiary" size="xl" />
          </span>
          <h2 className="mt-4 text-xl font-medium text-black">
            Waiting for signature...
          </h2>
          <p className="mt-2 text-gray-400">
            Please sign the transaction using Snapshot to upload your image
          </p>
        </div>
      </Dialog>
      <div>
        <div className="mb-6 inline-block rounded-full bg-white px-4 py-2 text-gray-400 transition hover:bg-gray-100 lg:mb-12">
          <Link href={`/events/${eventId}`}>
            <a>← Back to event</a>
          </Link>
        </div>
        {!isImageSubmited ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {isError ? (
              <div className="mb-4 rounded-md bg-red-100 p-2 text-center">
                🚨 An error occured when uploading your image
              </div>
            ) : null}
            <div className="mb-16 rounded-full border p-2 text-center text-sm">
              You only need an active wallet (holding min. 0.0001 ETH) to submit
              an image
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="mb-4 w-full flex-1 cursor-pointer pl-0 lg:mb-0 ">
                <FileInput
                  id="image"
                  register={register}
                  required
                  value={image}
                  accept="image/*"
                />
              </div>
              <div className="ml-0 flex-1 lg:ml-12">
                <h1 className="text-xl font-bold">Submit an image</h1>
                <p className="mb-8">
                  for{" "}
                  <span className="text-primary-800">
                    {SPACE_INIT?.event_name}
                  </span>{" "}
                </p>
                <div className="mb-4">
                  <TextInput
                    id="name"
                    label="Name"
                    placeholder={`e.g. "View from my window"`}
                    register={register}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Textarea
                    id="description"
                    label="Description (Optional)"
                    placeholder={`e.g. "The first thing I see in the morning when I wake up"`}
                    register={register}
                  />
                </div>
                <Button
                  disabled={
                    !isUserCanSubmit &&
                    Boolean(!isFileImage(image?.[0]) || !name)
                  }
                  isLoading={isLoading}
                >
                  Submit image
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center pb-12 text-center">
            <span className="mb-1 text-5xl">✨</span>
            <h2 className="mb-1 font-medium">
              Your image has been successfully submitted!
            </h2>
            <p className="mb-4">
              for{" "}
              <span className="text-primary-800">{SPACE_INIT?.event_name}</span>{" "}
              by{" "}
              <span className="text-primary-800">
                {SPACE_INIT?.creator_name}
              </span>
            </p>
            <Link href={`/events/${eventId}/${receipt?.id}`}>
              <a>
                <Button>View submission</Button>
              </a>
            </Link>
            <Link href={`/events/${eventId}/${receipt?.id}`}>
              <a>
                <img
                  className="mt-4 h-96 w-full object-contain"
                  src={URL.createObjectURL(image?.[0])}
                />{" "}
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Create;
