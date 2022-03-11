import { useState } from "react";
import Button from "components/Button";
import Dialog from "components/Dialog";
import useRarible from "hooks/useRarible";
import useOrders from "hooks/useOrders";

interface DialogRemoveSell {
  contractAddress: string;
  tokenId: string;
}

const DialogRemoveSell: React.FC<DialogRemoveSell> = ({
  contractAddress,
  tokenId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { removeSell } = useRarible();
  const { orders, isLoading } = useOrders(contractAddress, tokenId);

  const removeFromSell = async () => {
    if (!orders) {
      return;
    }

    const order = await removeSell(orders.orders[0]);

    if (order?.data) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      trigger={<Button variant="primary">Remove from sale</Button>}
    >
      <div className="mb-6 text-center">
        <span className="text-4xl">🚶‍♀️</span>
        <h2 className="mt-4 text-lg font-bold text-black">Remove from sale</h2>
      </div>
      <div>
        <p>Do you really want to remove your item from sale?</p>
        <p>
          Canceling your listing will unpublish this sale from hellocurator and
          requires a transaction to make sure it will never be fulfillable.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="my-4">
          <Button
            isBlock
            variant="secondary"
            isLoading={isLoading}
            onClick={removeFromSell}
          >
            Remove from sale
          </Button>
        </div>
        <Button isBlock variant="tertiary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </Dialog>
  );
};

export default DialogRemoveSell;
