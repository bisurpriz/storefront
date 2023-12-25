import { gql } from "@apollo/client";

const SUBSCRIBE_TO_CHATS = gql`
  subscription aa {
    chat_thread {
      messages {
        message
      }
    }
  }
`;

export { SUBSCRIBE_TO_CHATS };
