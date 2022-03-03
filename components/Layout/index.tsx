import ButtonConnectWallet from "./ButtonConnectWallet";
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
    <header className="mx-auto max-w-screen-2xl px-6 pt-4 pb-8 md:px-24 lg:pb-16">
      <nav className="flex flex-wrap items-center justify-between">
        <ul>
          <li className="mr-4">
            <Link href="/">
              <a className="inline-flex items-center font-bold">
                <img src="/logo.svg" className="mr-2 h-6 w-6" />
                <span className="hidden sm:block">hellocurator</span>
              </a>
            </Link>
          </li>
        </ul>
        <ul className="flex w-fit items-center justify-end">
          <li className="mr-6">
            <a
              href="https://www.notion.so/Introducing-hellocurator-v0-a4d98061d93a470b9bf2da93af9f9be1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              About
            </a>
          </li>
          <li className="flex">
            <ButtonConnectWallet />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Layout;
