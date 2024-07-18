"use client";

import { ApolloLink, HttpLink, split } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { WebSocketLink } from "apollo-link-ws";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { setVerbosity } from "ts-invariant";
import { getMainDefinition } from "@apollo/client/utilities";
import { getAccessToken } from "@/app/actions";
import { setContext } from "@apollo/client/link/context";

if (process.env.NODE_ENV === "development") {
  setVerbosity("debug");
  loadDevMessages();
  loadErrorMessages();
}

const setTokenInHeader = async (headers = {}) => {
  try {
    const cooks = await getAccessToken();
    if (!cooks) return "";

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
    uri: "https://bisurprizdev.hasura.app/v1/graphql",
  });

  const wsLink =
    typeof window !== "undefined"
      ? new WebSocketLink({
          uri: "wss://bisurprizdev.hasura.app/v1/graphql",
          options: {
            lazy: true,
            timeout: 30000,
            reconnect: true,
            connectionParams: () => {
              return setTokenInHeader();
            },
          },
        })
      : null;

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

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
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
