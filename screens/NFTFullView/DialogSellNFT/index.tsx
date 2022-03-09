import { useEffect, useState } from "react";
import Button from "components/Button";
import Dialog from "components/Dialog";
import useRarible from "hooks/useRarible";
import NumberInput from "components/NumberInput";
import { SubmitHandler, useForm } from "react-hook-form";
import usePrice from "hooks/usePrice";

interface DialogSellNFTProps {
  contractAddress: string;
  tokenId: string;
  sellerAddress: string;
}

type FormValues = {
  price: string;
};

const DialogSellNFT: React.FC<DialogSellNFTProps> = ({
  contractAddress,
  tokenId,
  sellerAddress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { sellOrder } = useRarible();
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const { data: priceEth, isLoading: isPriceEthLoading } = usePrice(
    "ethereum",
    "usd"
  );
  const { price } = watch();
  const priceInUsd =
    isPriceEthLoading && !price ? 0 : Number(price) * priceEth?.ethereum?.usd;

  const putOnSale: SubmitHandler<FormValues> = (data) => {
    console.log("data", data);

    const order = sellOrder(
      contractAddress,
      tokenId,
      sellerAddress,
      "10000000000000000"
    );

    console.log("order", order);
  };

  return (
    <Dialog
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      trigger={<Button type="button">Put on sale</Button>}
    >
      <div className="mb-6 text-center">
        <span className="text-4xl">🎈</span>
        <h2 className="mt-4 text-lg font-bold text-black">
          List item for sale
        </h2>
      </div>
      <div className="flex flex-col">
        <p className="mb-4">
          Enter new price. Your NFT will be buyable on hellocurator.
        </p>
        <form onSubmit={handleSubmit(putOnSale)}>
          <div className="mb-4">
            <NumberInput
              id="price"
              label="Enter ETH price"
              placeholder="0.1 Ξ"
              register={register}
              min={"0.00001"}
              step={"0.00001"}
              required
            />
            <div className="text-right">
              Total ={" "}
              {Number(priceInUsd).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              })}
            </div>
            <div className="mt-2">
              <span className="text-gray-600">
                Service fee <span className="font-medium text-black">2.5%</span>
              </span>
            </div>
          </div>
          <Button isBlock>Complete listing</Button>
        </form>
      </div>
    </Dialog>
  );
};

export default DialogSellNFT;
