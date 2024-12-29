import { motion } from "motion/react";
import { FC, useEffect, useRef } from "react";
import { MessageStatus } from "./MessageStatus";

type MessageLineProps = {
  messages: any[];
  user: any;
};

const MessageLine: FC<MessageLineProps> = ({ messages, user }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return messages.map((message, index) => {
    return (
      <motion.div
        ref={messageRef}
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`mb-4 flex ${message.sender.id === user.id ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[50%] rounded-lg p-3 shadow-sm ${
            message.receiver.id !== user.id
              ? "bg-accent text-accent-foreground"
              : "bg-tertiary text-tertiary-foreground"
          }`}
        >
          <p>{message.message}</p>
          <div className="mt-1 flex items-center justify-end space-x-1">
            <p className="text-xs opacity-70">
              {new Date(message.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {message.receiver.id !== user.id && (
              <MessageStatus status={message.is_read} />
            )}
          </div>
        </div>
      </motion.div>
    );
  });
};

export default MessageLine;
