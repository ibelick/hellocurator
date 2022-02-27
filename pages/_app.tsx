import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import {
  // defaultChains,
  // InjectedConnector,
  Provider as WagmiProvider,
} from "wagmi";

// const connectors = ({ chainId }: { chainId?: number }) => {
//   return [
//     new InjectedConnector({
//       chains: defaultChains,
//       options: {
//         shimDisconnect: true,
//       },
//     }),
//   ];
// };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider autoConnect>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </WagmiProvider>
  );
}

export default MyApp;
