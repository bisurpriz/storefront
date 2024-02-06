import { gql } from '@apollo/client';

const SEND_MESSAGE_ALONE = gql`
  mutation sendMessage(
    $message: String!
    $receiver_id: uuid!
    $order_tenant_id: bigint!
  ) {
    insert_message_one(
      object: {
        receiver_id: $receiver_id
        message: $message
        chat_thread: {
          data: { order_tenant_id: $order_tenant_id, tenat_id: $receiver_id }
          on_conflict: {
            constraint: chat_thread_order_tenant_id_key
            update_columns: [user_id]
          }
        }
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
  mutation sendMessage(
    $message: String!
    $receiver_id: uuid!
    $chat_thread_id: uuid!
  ) {
    insert_message_one(
      object: {
        receiver_id: $receiver_id
        message: $message
        chat_thread_id: $chat_thread_id
      }
    ) {
      created_at
    }
  }
`;

const MARK_AS_READ = gql`
  mutation markAsRead($chat_thread_id: uuid!) {
    update_message_many(
      updates: {
        _set: { is_read: true }
        where: {
          chat_thread_id: { _eq: $chat_thread_id }
          is_read: { _eq: false }
        }
      }
    ) {
      affected_rows
    }
  }
`;

export { SEND_MESSAGE_ALONE, SEND_MESSAGE, MARK_AS_READ };
