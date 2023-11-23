import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { authLink, errorLink, removeTypenameLink } from "./links";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      errorLink,
      authLink,
      new HttpLink({
        uri: "https://bisurprizdev.hasura.app/v1/graphql",
      }),
      removeTypenameLink,
    ]),
    connectToDevTools: true,
    ssrMode: true,
  });
});
