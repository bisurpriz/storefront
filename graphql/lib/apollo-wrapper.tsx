'use client';

import { ApolloLink, HttpLink, split } from '@apollo/client';
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { WebSocketLink } from 'apollo-link-ws';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { setVerbosity } from 'ts-invariant';
import { getMainDefinition } from '@apollo/client/utilities';
import { getIdToken } from '@/app/actions';

if (process.env.NODE_ENV === 'development') {
  setVerbosity('debug');
  loadDevMessages();
  loadErrorMessages();
}

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://bisurprizdev.hasura.app/v1/graphql',
  });

  const wsLink =
    typeof window !== 'undefined'
      ? new WebSocketLink({
          uri: 'wss://bisurprizdev.hasura.app/v1/graphql',
          options: {
            lazy: true,
            timeout: 30000,
            reconnect: true,
            connectionParams: () => {
              return getIdToken().then((cooks) => {
                if (!cooks) return {};
                return {
                  headers: {
                    Authorization: `Bearer ${cooks}`,
                  },
                };
              });
            },
          },
        })
      : null;

  const _httpLink =
    typeof window !== 'undefined'
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink as any,
          httpLink
        )
      : httpLink;

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            _httpLink,
          ])
        : _httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
