"use client";
import MessageItem from "./MessageItem";
import { useClaims } from "@/hooks/useClaims";
import { localeFormat } from "@/utils/format";
import { useEffect, useRef } from "react";

const MessageList = ({
  messages,
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
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messages flex-1 mt-4 h-full overflow-auto mb-16" ref={ref}>
      {messages?.map((item) => (
        <MessageItem
          key={item.id}
          message={item.message}
          date={localeFormat(new Date(item.created_at), "PPP")}
          picture={item.sender.picture}
          type={item.sender.id === id ? "sent" : "received"}
        />
      ))}
    </div>
  );
};

export default MessageList;
