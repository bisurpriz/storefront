import { subscribe } from "@/graphql/lib/client";
import { SUBSCRIBE_TO_CHATS } from "@/graphql/queries/chat/subscription";

export const subscribeToChats = () => {
  //@ts-expect-error sadasd
  const { data } = subscribe({
    query: SUBSCRIBE_TO_CHATS,
  });

  console.log(data, "data");
};
