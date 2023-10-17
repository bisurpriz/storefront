import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getSession } from "@auth0/nextjs-auth0";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(async (_, { headers }) => {
  const token = await getSession();

  const hasToken = token ? { authorization: `Bearer ${token.idToken}` } : {};

  return {
    headers: {
      ...headers,
      ...hasToken,
    },
  };
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
      new HttpLink({
        uri: "https://bisurprizdev.hasura.app/v1/graphql",
      })
    ),
  });
});
