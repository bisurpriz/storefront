import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getSession } from "@auth0/nextjs-auth0";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { notFound } from "next/navigation";

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
  let token = null;

  try {
    const session = await getSession();
    token = session?.idToken;
  } catch (e) {
    console.error(e, "error getting session");
    notFound();
  }

  const hasToken = token ? { authorization: `Bearer ${token}` } : {};

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
