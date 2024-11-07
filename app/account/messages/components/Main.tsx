"use client";
import { Button } from "@/components/ui/button";
import useDelayUnmount from "@/hooks/useDelayUnmount";
import useChatStore from "@/store";
import { useState } from "react";
import { sendMessage } from "../action";
import ChatList from "./ChatList";
import Input from "./Message/Input";
import MessageList from "./Message/MessageList";
import Cookies from "js-cookie";
import ArrowBackCircleSharp from "@/components/Icons/ArrowBackCircleSharp";

const Main = ({ tenantId }: { tenantId?: string }) => {
  const [isMessageOpen, setIsMessageOpen] = useState(() => Boolean(tenantId));
  const [tenantIdState, setTenantIdState] = useState(tenantId);
  const [text, setText] = useState("");

  const shouldRenderChild = useDelayUnmount(isMessageOpen, 500);

  const { chats, addMessage } = useChatStore((state) => state);

  const handleMessage = async () => {
    addMessage({
      id: Math.random().toString(),
      message: text,
      created_at: new Date().toISOString(),
      sender: {
        id: Cookies.get("user_id"),
      },
      receiver: {
        id: tenantId,
      },
    });

    // send to server
    sendMessage({
      message: text,
      receiver_id: tenantIdState,
      chat_thread_id: thread?.id,
    });

    setText("");
  };

  const thread = chats?.find((item) => item.tenant.id === tenantIdState);

  return (
    <>
      <div className="relative flex h-auto min-h-[50vh] flex-1 overflow-hidden">
        <div
          className={`sidebar g:flex flex-2 w-full flex-col pr-6 transition-all duration-500 ${
            !isMessageOpen ? "translate-x-0" : "-translate-x-[210%]"
          }`}
        >
          <ChatList
            onMessageSelect={(tenantId) => {
              setTenantIdState(tenantId);
              setIsMessageOpen(!isMessageOpen);
            }}
            chats={chats}
          />
        </div>

        {shouldRenderChild && thread && (
          <div
            className={`chat-area absolute top-0 flex h-full w-full flex-1 flex-col transition-all duration-500 ${
              isMessageOpen ? "translate-x-0" : "-translate-x-[210%]"
            }`}
          >
            <div className="flex items-center">
              <Button
                icon={<ArrowBackCircleSharp className="h-7 w-7" />}
                type="button"
                size="sm"
                variant="link"
                className="gap-2 px-0 py-0 pl-0"
                onClick={() => setIsMessageOpen(false)}
              />

              <h2 className="mb-0 inline-block flex-auto border-b-2 border-gray-200 py-1 text-xl">
                <b>{thread?.tenant?.tenants?.[0]?.name}</b> ile Görüşme
              </h2>
            </div>

            <MessageList
              messages={thread?.messages}
              threadId={thread?.id}
              vendor={thread?.tenant?.tenants?.[0]}
            />
            <Input
              onMessageSend={handleMessage}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
