import { ApolloClient, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { links } from "./links";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        category: {
          keyFields: ["name"],
        },
      },
    }),
    link: links,
    connectToDevTools: true,
    ssrMode: true,
  });
});

export const { query, mutate, subscribe, refetchQueries } = getClient();
