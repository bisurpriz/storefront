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
import { useMemo } from "react";
import { setVerbosity } from "ts-invariant";

// Environment variables
const HASURA_URL = process.env.HASURA_URL!;
const HASURA_WS_URL = process.env.HASURA_WS_URL!;
const IS_DEV = process.env.NODE_ENV === "development";
const IS_SERVER = typeof window === "undefined";

// Development only imports
if (IS_DEV) {
  setVerbosity("debug");
  loadDevMessages();
  loadErrorMessages();
}

// Token management
const getAuthHeaders = async (headers = {}) => {
  try {
    const token = await getClientCookie(CookieTokens.ACCESS_TOKEN);
    if (!token) return headers;

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  } catch (error) {
    console.error("Auth header error:", error);
    return headers;
  }
};

// Auth link with retry logic
const authLink = setContext(async (_, { headers }) => {
  const authHeaders = await getAuthHeaders(headers);
  return authHeaders;
});

// Cache configuration
const cache = new InMemoryCache({
  resultCaching: true,
  typePolicies: {
    Query: {
      fields: {
        // Add field policies here if needed
      },
    },
  },
});

// Create Apollo Client instance
function makeClient() {
  // HTTP Link
  const httpLink = new HttpLink({
    uri: HASURA_URL,
    fetchOptions: {
      mode: 'cors',
    },
    credentials: 'include',
  });

  // WebSocket Link (only in browser)
  const wsLink = !IS_SERVER
    ? new GraphQLWsLink(
        createClient({
          url: HASURA_WS_URL,
          lazy: true,
          lazyCloseTimeout: 30000,
          retryAttempts: 3,
          connectionParams: getAuthHeaders,
          shouldRetry: (errOrCloseEvent) => {
            // Basit retry logic
            return errOrCloseEvent instanceof Error && 
                   errOrCloseEvent.message !== 'forbidden' && 
                   wsLink?.subscriptionsClient?.retries < 3;
          },
        })
      )
    : null;

  // Split traffic between WS and HTTP
  const splitLink = !IS_SERVER && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  // Compose links based on environment
  const link = IS_SERVER
    ? ApolloLink.from([
        authLink,
        new SSRMultipartLink({
          stripDefer: true,
        }),
        splitLink,
      ])
    : ApolloLink.from([authLink, splitLink]);

  // Create and return client
  return new ApolloClient({
    cache,
    link,
    name: 'web-client',
    version: '1.0',
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    connectToDevTools: IS_DEV,
  });
}

// Memoized Apollo Provider
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const client = useMemo(() => makeClient(), []);

  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}
