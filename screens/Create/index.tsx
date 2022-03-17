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

type FormValues = {
  image: FileList;
  name: string;
  description: string;
};

const Create: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { uid } = router.query;
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

    // @todo: if receipt do something
    console.log("receipt", receipt);

    setIsLoading(false);
  };

  return (
    <div>
      <div className="mb-6 inline-block rounded-full bg-white px-4 py-2 text-gray-400 transition hover:bg-gray-100 lg:mb-12">
        <Link href={`/${uid}`}>
          <a>← Back to gallery</a>
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
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
          </div>
          <div className="mb-4 w-full flex-1 pl-0 lg:mb-0 lg:pl-12">
            <FileInput
              label="Image"
              id="image"
              register={register}
              required
              value={image}
            />
          </div>
        </div>
        <Button
          disabled={!isFileImage(image?.[0]) || !name}
          isLoading={isLoading}
        >
          Submit image
        </Button>
      </form>
    </div>
  );
};

export default Create;
