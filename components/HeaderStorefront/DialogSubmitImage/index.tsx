import { useState } from "react";
import Button from "components/Button";
import Dialog from "components/Dialog";
import { useAccount } from "wagmi";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "components/TextInput";
import FileInput from "components/FileInput";
import { createProposal } from "lib/snapshot";
import Textarea from "components/Textarea";
import { isFileImage } from "utils/file";
import useIpfs from "hooks/useIpfs";

const DialogSubmitNFT: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ data: accountData }] = useAccount();

  return (
    <Dialog
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      trigger={
        <Button type="button" disabled={!Boolean(accountData?.address)}>
          Submit an image
        </Button>
      }
    >
      <FormSubmitImage setIsOpen={setIsOpen} />
    </Dialog>
  );
};

type FormValues = {
  image: FileList;
  name: string;
  description: string;
};

const FormSubmitImage: React.FC<{
  setIsOpen: (isOpen: boolean) => void;
}> = ({ setIsOpen }) => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { image, name } = watch();
  const { upload } = useIpfs();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const file = data.image[0];

    const ipfsUrl = await upload(file);

    if (!ipfsUrl) {
      return;
    }

    const receipt = await createProposal(ipfsUrl, data.name, data.description);

    if (receipt) {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <span className="text-4xl">💾</span>
        <h2 className="mt-4 text-lg font-bold text-black">Submit an image</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FileInput
            label="Image"
            id="image"
            register={register}
            required
            value={image}
          />
        </div>
        <div className="mb-4">
          <TextInput
            id="name"
            label="Name"
            placeholder={`e.g. "photo of my cat"`}
            register={register}
            required
          />
        </div>
        <div className="mb-4">
          <Textarea
            id="description"
            label="Description (Optional)"
            placeholder={`e.g. "my cat name is Marcel, I love him"`}
            register={register}
          />
        </div>
        <Button
          isBlock
          disabled={!isFileImage(image?.[0]) || !name}
          isLoading={isLoading}
        >
          Submit image
        </Button>
      </form>
    </div>
  );
};

export default DialogSubmitNFT;
