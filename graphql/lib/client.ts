import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getSession } from "@auth0/nextjs-auth0";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "next-auth/jwt";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken({
    req: {
      headers,
    },
    secret: process.env.AUTH0_CLIENT_SECRET,
  });

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
    link: from([
      errorLink,
      authLink,
      new HttpLink({
        uri: "https://bisurprizdev.hasura.app/v1/graphql",
      }),
    ]),
    connectToDevTools: true,
    ssrMode: true,
  });
});
