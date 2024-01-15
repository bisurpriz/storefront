"use client";
import MessageItem from "./MessageItem";
import { useClaims } from "@/hooks/useClaims";
import { localeFormat } from "@/utils/format";
import { memo, useEffect, useRef } from "react";
import MessageItemSkeleton from "./MessageItemSkeleton";
import { markAsRead } from "../../action";

const MessageList = ({
  messages,
  threadId,
}: {
  messages: {
    id: string;
    message: string;
    created_at: string;
    sender: {
      id: string;
      firstname: string;
      lastname: string;
      picture: string;
    };
    receiver: {
      id: string;
      firstname: string;
      lastname: string;
      picture: string;
    };
  }[];
  threadId: string;
}) => {
  const {
    claims: { id },
  } = useClaims();

  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    markAsRead(threadId);
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messages flex-1 mt-4 h-full overflow-auto mb-16" ref={ref}>
      {!messages
        ? [1, 2, 3, 4, 5, 6, 7]?.map((item) => (
            <MessageItemSkeleton key={item} type={item % 2 === 0 ? "sent" : "received"} />
          ))
        : messages?.map((item) => (
            <MessageItem
              key={item.id}
              message={item.message}
              date={item?.created_at ? localeFormat(new Date(item.created_at), "PPP") : ""}
              picture={item?.sender?.picture}
              type={item?.sender?.id === id ? "sent" : "received"}
            />
          ))}
    </div>
  );
};

export default memo(MessageList);
