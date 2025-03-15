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
} from "@apollo/experimental-nextjs-app-support";
import { createClient } from "graphql-ws";

// Environment variables
const HASURA_URL = process.env.HASURA_URL!;
const HASURA_WS_URL = process.env.HASURA_WS_URL!;
const IS_DEV = process.env.NODE_ENV === "development";
const IS_SERVER = typeof window === "undefined";

// Development only imports
if (IS_DEV) {
  // Import dynamically to avoid SSR issues
  import("@apollo/client").then(({ setLogVerbosity }) => {
    setLogVerbosity("debug");
  });
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
      mode: "cors",
    },
    credentials: "include",
  });

  // WebSocket Link (only in browser)
  let wsLink: GraphQLWsLink | null = null;

  if (!IS_SERVER) {
    wsLink = new GraphQLWsLink(
      createClient({
        url: HASURA_WS_URL,
        lazy: true,
        lazyCloseTimeout: 30000,
        retryAttempts: 3,
        connectionParams: getAuthHeaders,
        shouldRetry: (errOrCloseEvent) => {
          return (
            errOrCloseEvent instanceof Error &&
            errOrCloseEvent.message !== "forbidden" &&
            // Safe access to retries count
            (createClient as any)._retries < 3
          );
        },
      }),
    );
  }

  // Split traffic between WS and HTTP
  let mainLink: ApolloLink = httpLink;

  if (!IS_SERVER && wsLink) {
    mainLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink,
    );
  }

  // Final link chain
  const link = ApolloLink.from([authLink, mainLink]);

  // Create and return client
  return new ApolloClient({
    cache,
    link,
    name: "web-client",
    version: "1.0",
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    connectToDevTools: IS_DEV,
  });
}

// Memoized Apollo Provider
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
