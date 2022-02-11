import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://hub.snapshot.org/graphql/",
  cache: new InMemoryCache(),
});
