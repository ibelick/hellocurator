import { useState } from "react";
import Button from "components/Button";
import Dialog from "components/Dialog";
import { useAccount } from "wagmi";
import { create } from "ipfs-http-client";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "components/TextInput";
import FileInput from "components/FileInput";
import { createProposal } from "lib/snapshot";

// @ts-ignore
const client = create("https://ipfs.infura.io:5001/api/v0");

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
      <FormSubmitImage />
    </Dialog>
  );
};

type FormValues = {
  image: FileList;
  name: string;
  description: string;
};

const FormSubmitImage = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const { image } = watch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data", data);

    try {
      const file = data.image[0];

      const added = await client.add(file);
      const urlIpfsUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("url", urlIpfsUrl);

      const receipt = await createProposal(
        urlIpfsUrl,
        data.name,
        data.description
      );

      console.log("receipt", receipt);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
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
          <TextInput
            id="description"
            label="Description (Optional)"
            placeholder={`e.g. "my cat name is Marcel, I love him"`}
            register={register}
          />
        </div>
        <Button isBlock>Submit image</Button>
      </form>
    </div>
  );
};

export default DialogSubmitNFT;
