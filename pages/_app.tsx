import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
declare global {
  interface Window {
    ethereum: {
      request<T>(params: { method: string }): Promise<T>;
      on<T>(event: string, cb: (params: T) => void): void;
      removeListener<T>(event: string, cb: (params: T) => void): void;
      selectedAddress: string | undefined;
    };
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
