import Button from "components/Button";
import { useEffect, useState } from "react";
import { truncateEthAddress } from "utils/ethereum";
import NFTGallery from "./NFTGallery";
import SubmitNFT from "./SubmitNFT";

const Storefront: React.FC<{ proposals: any }> = ({ proposals }) => {
  return (
    <Layout>
      <div className="mb-8">
        <NFTGallery />
      </div>
      <div>
        <h2 className="mb-6 text-2xl">Submit an NFT</h2>
        <SubmitNFT />
      </div>
    </Layout>
  );
};

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-screen-2xl px-24">{children}</main>
    </div>
  );
};

const Header = () => {
  return (
    <header className="mx-auto max-w-screen-2xl px-24 py-8">
      <nav className="flex flex-wrap items-center justify-between">
        <ul className="mb-4 flex md:mb-0">
          <li className="mr-8">
            <a className="text-xl font-bold" href="/">
              storefront
            </a>
          </li>
        </ul>
        <ul className="flex w-fit items-center justify-end">
          <li className="flex">
            <div className="mr-8">
              <ButtonConnectWallet />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const ButtonConnectWallet: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window?.ethereum) {
      alert("No wallet found. Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        alert("No authorized account found");
      }

      setAddress(accounts[0]);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (
      typeof window.ethereum !== "undefined" &&
      typeof window.ethereum.selectedAddress == "string"
    ) {
      setAddress(window.ethereum.selectedAddress);
    }
  }, []);

  useEffect(() => {
    if (!window?.ethereum) {
      return;
    }

    const listener = ([selectedAddress]: string[]) => {
      setAddress(selectedAddress);
    };

    window.ethereum.on("accountsChanged", listener);

    return () => {
      window.ethereum.removeListener("accountsChanged", listener);
    };
  }, []);

  return (
    <Button onClick={connectWallet}>
      {address ? truncateEthAddress(address) : `Connect Wallet`}
    </Button>
  );
};

export default Storefront;
