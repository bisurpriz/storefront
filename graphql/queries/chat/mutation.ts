import { gql } from "@apollo/client";

const SEND_MESSAGE_ALONE = gql`
  mutation sendMessage($message: String!, $receiver_id: uuid!, $order_tenant_id: bigint!) {
    insert_message_one(
      object: {
        receiver_id: $receiver_id
        message: $message
        chat_thread: { data: { order_tenant_id: $order_tenant_id, tenat_id: $receiver_id } }
      }
    ) {
      created_at
      chat_thread {
        tenat_id
        order_tenant_id
      }
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
