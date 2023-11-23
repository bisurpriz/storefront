import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { notFound } from "next/navigation";
import { getRefreshFetch } from "../actions";

export const removeTypenameLink = removeTypenameFromVariables();
export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

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
