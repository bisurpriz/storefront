import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { notFound } from "next/navigation";
import { getRefreshFetch } from "../actions";
import { HttpLink, from } from "@apollo/client";

export const removeTypenameLink = removeTypenameFromVariables();
export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const authLink = setContext(async (_, { headers }) => {
  let token = null;

  try {
    const ntoken = await getRefreshFetch();

    token = ntoken.idToken;
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

export const httpLink = new HttpLink({
  uri: "https://bisurprizdev.hasura.app/v1/graphql",
});

export const links = from([authLink, errorLink, removeTypenameLink, httpLink]);
