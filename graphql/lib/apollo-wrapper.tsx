"use client";

import { CookieTokens } from "@/app/@auth/contants";
import { getClientCookie } from "@/utils/getCookie";
import { ApolloLink, HttpLink, split } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { createClient } from "graphql-ws";
import { setVerbosity } from "ts-invariant";

if (process.env.NODE_ENV === "development") {
  setVerbosity("debug");
  loadDevMessages();
  loadErrorMessages();
}

const setTokenInHeader = async (headers = {}) => {
  try {
    const cooks = await getClientCookie(CookieTokens.ACCESS_TOKEN);
    console.log("cooks", cooks);
    if (!cooks) throw new Error("No token found");

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${cooks}`,
      },
    };
  } catch (error) {
    console.error("Error setting token in header", error);
    return headers;
  }
};

const authLink = setContext((_, { headers }) => {
  return setTokenInHeader(headers);
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.HASURA_URL,
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${process.env.HASURA_WS_URL}`,
      lazy: true,
      lazyCloseTimeout: 30000,
      retryAttempts: 3,
      connectionParams: async () => {
        return await setTokenInHeader();
      },
    }),
  );

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
          httpLink,
        )
      : httpLink;

  return new ApolloClient({
    cache: new InMemoryCache({
      resultCaching: true,
    }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            authLink,
            new SSRMultipartLink({
              stripDefer: true,
            }),
            _httpLink,
          ])
        : ApolloLink.from([authLink, _httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
