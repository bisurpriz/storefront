export const SendMessageDocument = `
    mutation sendMessage($message: String!, $receiver_id: uuid!, $chat_thread_id: uuid!) {
  insert_message_one(
    object: {receiver_id: $receiver_id, message: $message, chat_thread_id: $chat_thread_id}
  ) {
    created_at
  }
}
    `;

export const MarkAsReadDocument = `
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

export const LoginMutationDocument = `
    mutation loginMutation($email: String, $password: String) {
  login(args: {email: $email, password: $password}) {
    data
    success
    message
  }
}
    `;
