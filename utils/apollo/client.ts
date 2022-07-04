import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";

export const client = new ApolloClient({
  link: new HttpLink({
    fetch,
    uri: "https://api.thegraph.com/subgraphs/id/QmQFajWj8nsFoe6T6EKhDE6WiemaM5f61VzPiDdxbo6Lwb",
  }),
  cache: new InMemoryCache(),
});
