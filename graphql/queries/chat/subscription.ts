import { gql } from "@apollo/client";

const SUBSCRIBE_TO_CHATS = gql`
  subscription subscribeToChats {
    chat_thread {
      id
      tenant {
        id
        picture
        firstname
        lastname
      }
      messages {
        message
        id
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
      order_item {
        product {
          image_url
          name
          id
        }
      }
    }
  }
`;

export { SUBSCRIBE_TO_CHATS };
