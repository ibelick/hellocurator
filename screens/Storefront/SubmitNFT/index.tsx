import { useState } from "react";
import { createProposal } from "lib/snapshot";
import TextInput from "components/TextInput";
import Button from "components/Button";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  contractAddress: string;
  nftId: string;
};

const SubmitNFT = () => {
  const { register, handleSubmit, getValues } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [isNftFetched, setIsNftFetched] = useState(false);
  const [NFT, setNFT] = useState<any>(null);

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createProposal(data.contractAddress, data.nftId);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="button" onClick={fetchNftsWithRarible}>
        preview nft
      </Button>
      <div className="my-4">
        {isLoading ? <p>loading...</p> : null}
        {NFT ? (
          <img
            className="h-full w-32"
            src={NFT.meta?.content[0].url}
            alt={NFT.meta.name}
          />
        ) : null}
      </div>
      {isNftFetched ? <Button type="submit">propose NFT</Button> : null}
    </form>
  );
};

export default SubmitNFT;
