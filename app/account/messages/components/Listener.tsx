'use client';
import { ApolloWrapper } from '@/graphql/lib/apollo-wrapper';
import { SUBSCRIBE_TO_CHATS } from '@/graphql/queries/chat/subscription';
import useChatStore from '@/store';
import { useSubscription } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0/client';

export const dynamic = 'force-dynamic';

const SocketListener = () => {
  const { setChats } = useChatStore((state) => state);

  const { error } = useSubscription(SUBSCRIBE_TO_CHATS, {
    onData(options: any) {
      setChats(options?.data?.data?.chat_thread);
    },
  });

  if (error) {
    console.log(error);
  }

  return <div></div>;
};

const Listener = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <ApolloWrapper>
      <SocketListener />
    </ApolloWrapper>
  );
};

export default Listener;
