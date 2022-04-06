import ButtonConnectWallet from "./ButtonConnectWallet";
import Head from "next/head";
import Link from "next/link";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>hellocurator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="font-display">
        <Header />
        <main className="mx-auto max-w-screen-2xl px-6 pb-12 md:px-24 ">
          {children}
        </main>
      </div>
    </>
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
            <Link href="/about">
              <a className="text-gray-400 hover:text-gray-500">About</a>
            </Link>
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
