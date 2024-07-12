import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SubscribeToChatsSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type SubscribeToChatsSubscription = { chat_thread: Array<{ id: any, tenant: { id: any, picture?: string | null, firstname?: string | null, lastname?: string | null }, messages: Array<{ message: string, id: any, is_read?: boolean | null, created_at: any, sender: { picture?: string | null, id: any }, receiver: { picture?: string | null, id: any } }>, order_tenant: { id: any, order_items: Array<{ id: any, product: { image_url?: Array<string> | null, name: string, id: any } }> } }> };


export const SubscribeToChatsDocument = gql`
    subscription subscribeToChats {
  chat_thread {
    id
    tenant {
      id
      picture
      firstname
      lastname
    }
    messages(order_by: {created_at: asc}) {
      message
      id
      is_read
      created_at
      sender {
        picture
        id
      }
      receiver {
        picture
        id
      }
    }
    order_tenant {
      id
      order_items {
        id
        product {
          image_url
          name
          id
        }
      }
    }
  }
}
    `;

export function useSubscribeToChatsSubscription<TData = SubscribeToChatsSubscription>(options?: Omit<Urql.UseSubscriptionArgs<SubscribeToChatsSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<SubscribeToChatsSubscription, TData>) {
  return Urql.useSubscription<SubscribeToChatsSubscription, TData, SubscribeToChatsSubscriptionVariables>({ query: SubscribeToChatsDocument, ...options }, handler);
};