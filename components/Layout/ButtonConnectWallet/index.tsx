import Button from "components/Button";
import { useConnect, useAccount } from "wagmi";
import { truncateEthAddress } from "utils/ethereum";
import Dialog from "components/Dialog";
import { useState } from "react";
import { Connector, ConnectorData } from "wagmi-core";

const ButtonConnectWallet: React.FC = () => {
  const [{ data: connectData, loading: isLoadingConnectData }, connect] =
    useConnect();
  const [{ data: accountData, loading: isLoadingAccountData }, disconnect] =
    useAccount({
      fetchEns: true,
    });

  if (isLoadingConnectData && isLoadingAccountData) {
    return (
      <Button variant="tertiary" isLoading>
        Loading...
      </Button>
    );
  }

  if (!connectData.connected && !accountData) {
    return (
      <DialogConnectWallet
        connectors={connectData.connectors}
        connect={connect}
      />
    );
  }

  return (
    <DialogConnectedWallet
      address={accountData!.address}
      disconnect={disconnect}
    />
  );
};

const DialogConnectWallet: React.FC<{
  connectors: Connector<any, any>[];
  connect: (connector: Connector<any, any>) => Promise<{
    data?: ConnectorData<any> | undefined;
    error?: Error | undefined;
  }>;
}> = ({ connectors, connect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      trigger={<Button variant="tertiary">Connect Wallet</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <h2 className="mb-4 text-xl">Select a wallet</h2>
      <div>
        {connectors.map((connector) => {
          return (
            <div
              key={connector.id}
              className="flex cursor-pointer items-center justify-between rounded-sm border border-gray-300 p-4"
              onClick={async () => {
                const receipt = await connect(connector);

                if (receipt) {
                  setIsOpen(false);
                }
              }}
            >
              <span>{connector.name}</span>
              <img src="/injected.svg" height={32} width={32} />
            </div>
          );
        })}
      </div>
    </Dialog>
  );
};

const DialogConnectedWallet: React.FC<{
  address: string;
  disconnect: () => void;
}> = ({ address, disconnect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button variant="tertiary">
          <span className="mr-2 h-2 w-2 rounded-full border border-emerald-200 bg-emerald-500" />
          {truncateEthAddress(address)}
        </Button>
      }
    >
      <h2 className="mb-4 text-xl">Account</h2>
      <Button variant="tertiary" isBlock onClick={disconnect}>
        Disconnect
      </Button>
    </Dialog>
  );
};

export default ButtonConnectWallet;
