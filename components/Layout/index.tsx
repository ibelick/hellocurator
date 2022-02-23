import Button from "components/Button";
import { useEffect, useState } from "react";
import { truncateEthAddress } from "utils/ethereum";
import Link from "next/link";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="font-display">
      <Header />
      <main className="mx-auto max-w-screen-2xl px-6 md:px-24">{children}</main>
    </div>
  );
};

const Header = () => {
  return (
    <header className="mx-auto max-w-screen-2xl px-6 pt-4 pb-16 md:px-24">
      <nav className="flex flex-wrap items-center justify-between">
        <ul>
          <li className="mr-4">
            <Link href="/">
              <a className="inline-flex items-center font-bold">
                <img src="/logo.svg" className="mr-2 h-6 w-6" />
                hellocurator
              </a>
            </Link>
          </li>
        </ul>
        <ul className="flex w-fit items-center justify-end">
          <li className="mr-6">
            <a className="text-gray-400">About</a>
          </li>
          <li className="flex">
            <ButtonConnectWallet />
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
    <Button onClick={connectWallet} variant="tertiary">
      {address ? (
        <>
          <span className="mr-2 h-2 w-2 rounded-full border border-emerald-200 bg-emerald-500" />
          {truncateEthAddress(address)}
        </>
      ) : (
        `Connect Wallet`
      )}
    </Button>
  );
};

export default Layout;
