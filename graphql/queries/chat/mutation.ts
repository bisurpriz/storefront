import { gql } from "@apollo/client";

const SEND_MESSAGE_ALONE = gql`
  mutation sendMessage($message: String!, $receiver_id: uuid!, $sender_id: uuid!, $order_item_id: bigint!) {
    insert_message_one(
      object: {
        sender_id: $sender_id
        receiver_id: $receiver_id
        message: $message
        chat_thread: { data: { order_item_id: $order_item_id, tenat_id: $receiver_id } }
      }
    ) {
      created_at
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($message: String!, $receiver_id: uuid!, $chat_thread_id: uuid!) {
    insert_message_one(object: { receiver_id: $receiver_id, message: $message, chat_thread_id: $chat_thread_id }) {
      created_at
    }
  }
`;

export { SEND_MESSAGE_ALONE, SEND_MESSAGE };
