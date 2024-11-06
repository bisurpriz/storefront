import { HttpLink, from, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { checkExpire } from "../utils/checkExpire";
import { getAccessToken, readGuestIdFromCookies } from "@/app/actions";

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const wsLink = new WebSocketLink({
  uri: process.env.HASURA_WS_URL,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = await getAccessToken();

      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  },
});

export const authLink = setContext(async (_, { headers }) => {
  const cookieToken = await getAccessToken();
  const isExpired = checkExpire(cookieToken);

  if (cookieToken && !isExpired) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${cookieToken}`,
      },
    };
  }

  const guestId = await readGuestIdFromCookies();

  return {
    headers: {
      ...headers,
      "x-hasura-guest-id": guestId,
    },
  };
});

export const httpLink = new HttpLink({
  uri: process.env.HASURA_URL,
  credentials: "include",
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

export const links = from([authLink, errorLink, _httpLink]);
