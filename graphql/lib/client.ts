import { ApolloClient, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { links } from "./links";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      dataIdFromObject: (object, ctx) => {
        if (object?.__typename) {
          return `${object.__typename}:${object.id}`;
        }

        return ctx.storeObject?.__typename + ":" + ctx?.storeObject.id;
      },
    }),
    link: links,
    connectToDevTools: true,
    ssrMode: true,
  });
});

export const { query, mutate, subscribe, refetchQueries } = getClient();
