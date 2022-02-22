import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "lib/apollo";

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
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
