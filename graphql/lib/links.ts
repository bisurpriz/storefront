import { CookieTokens } from "@/app/@auth/contants";
import { HttpLink, from, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { cookies } from "next/headers";

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
      const token = cookies().get(CookieTokens.ACCESS_TOKEN)?.value;

      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  },
});

export const authLink = setContext(async (_, { headers }) => {
  let token = null;
  try {
    // TODO: Refresh Fetch işlemi yapılacak
    const ntoken = await cookies().get(CookieTokens.ACCESS_TOKEN)?.value;
    token = ntoken;
  } catch (e) {
    console.error(e, "error getting session");
  }

  const hasToken = token ? { authorization: `Bearer ${token}` } : {};

  /* const user_id = cookies().get(CookieTokens.USER_ID)?.value;
  const guest_id = cookies().get(CookieTokens.GUEST_ID)?.value;

  const newHeaders =
    !user_id && guest_id ? { ["x-hasura-guest-id"]: guest_id } : {}; */

  return {
    headers: {
      ...headers,
      ...hasToken,
    },
  };
});

export const httpLink = new HttpLink({
  uri: process.env.HASURA_URL,
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
