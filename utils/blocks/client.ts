import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";

export const blockClient = new ApolloClient({
  link: new HttpLink({
    fetch,
    uri: "https://api.bscgraph.org/subgraphs/name/bsc-blocks",
  }),
  cache: new InMemoryCache(),
});
