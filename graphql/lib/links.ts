import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { getRefreshFetch } from "../actions";
import { HttpLink, from, split } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { getSession } from "@auth0/nextjs-auth0";
import { getMainDefinition } from "@apollo/client/utilities";

export const removeTypenameLink = removeTypenameFromVariables();
export const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors, networkError, "selamun aleyküm");
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const wsLink =
  typeof window !== "undefined"
    ? new WebSocketLink({
        uri: "wss://bisurprizdev.hasura.app/v1/graphql",
        options: {
          reconnect: true,
          connectionParams: async () => {
            const token = await getSession();

            return {
              headers: {
                Authorization: `Bearer ${token?.idToken}`,
              },
            };
          },
        },
      })
    : null;

export const authLink = setContext(async (_, { headers }) => {
  let token = null;
  try {
    const ntoken = await getRefreshFetch();
    token = ntoken?.idToken;
  } catch (e) {
    console.error(e, "error getting session");
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

const _httpLink =
  typeof window !== "undefined"
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink as any,
        httpLink
      )
    : httpLink;

export const links = from([removeTypenameLink, authLink, errorLink, _httpLink]);
