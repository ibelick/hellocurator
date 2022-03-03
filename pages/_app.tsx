import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import { Provider as WagmiProvider } from "wagmi";
import { Toaster } from "react-hot-toast";
import * as Portal from "@radix-ui/react-portal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider autoConnect>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Portal.Root>
          <Toaster position="bottom-right" />
        </Portal.Root>
      </ApolloProvider>
    </WagmiProvider>
  );
}

export default MyApp;
