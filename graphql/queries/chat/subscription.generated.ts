import * as Types from "../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type SubscribeToChatsSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type SubscribeToChatsSubscription = {
  chat_thread: Array<{
    id: any;
    tenant: {
      id: any;
      picture?: string | null;
      firstname?: string | null;
      lastname?: string | null;
      tenants: Array<{ id: any; name?: string | null; logo?: string | null }>;
    };
    messages: Array<{
      message: string;
      id: any;
      is_read?: boolean | null;
      created_at: any;
      sender: { picture?: string | null; id: any };
      receiver: { picture?: string | null; id: any };
    }>;
    order_tenant: {
      id: any;
      order_items: Array<{
        id: any;
        product: { image_url?: Array<string> | null; name: string; id: any };
      }>;
    };
  }>;
};

export const SubscribeToChatsDocument = gql`
  subscription subscribeToChats {
    chat_thread {
      id
      tenant {
        id
        picture
        firstname
        lastname
        tenants {
          id
          name
          logo
        }
      }
      messages(order_by: { created_at: asc }) {
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
export type SubscribeToChatsSubscriptionResult =
  Apollo.SubscriptionResult<SubscribeToChatsSubscription>;
