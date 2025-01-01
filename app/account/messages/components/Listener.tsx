"use client";
import { ApolloWrapper } from "@/graphql/lib/apollo-wrapper";
import {
  SubscribeToChatsDocument,
  SubscribeToChatsSubscription,
  SubscribeToChatsSubscriptionVariables,
} from "@/graphql/queries/chat/subscription.generated";
import useChatStore from "@/store";
import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { getUserById } from "../../actions";

const SocketListener = () => {
  const { setChats } = useChatStore((state) => state);

  const { error } = useSubscription<
    SubscribeToChatsSubscription,
    SubscribeToChatsSubscriptionVariables
  >(SubscribeToChatsDocument, {
    onData(options: any) {
      setChats(options?.data?.data?.chat_thread);
    },
  });

  if (error) {
    console.error(error);
  }

  return null;
};

const Listener = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { user } = await getUserById();
      setUser(user);
    };
    getUser();
  }, []);

  if (!user) return null;
  return (
    <ApolloWrapper>
      <SocketListener />
    </ApolloWrapper>
  );
};

export default Listener;
