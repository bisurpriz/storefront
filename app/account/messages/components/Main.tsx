"use client";
import Button from "@/components/Button";
import useDelayUnmount from "@/hooks/useDelayUnmount";
import useChatStore from "@/store";
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { sendMessage } from "../action";
import ChatList from "./ChatList";
import Input from "./Message/Input";
import MessageList from "./Message/MessageList";
import Cookies from "js-cookie";

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
      <div className="flex-1 flex relative h-full">
        <div
          className={`sidebar w-full g:flex flex-2 flex-col pr-6 transition-all duration-500  ${
            !isMessageOpen ? "translate-x-0" : "-translate-x-[210%]"
          }`}
        >
          {
            <ChatList
              onMessageSelect={(tenantId) => {
                setTenantIdState(tenantId);
                setIsMessageOpen(!isMessageOpen);
              }}
              chats={chats}
            />
          }
        </div>

        {shouldRenderChild && thread && (
          <div
            className={`chat-area flex-1 flex flex-col absolute w-full top-0 transition-all duration-500 h-full  ${
              isMessageOpen ? "translate-x-0" : "-translate-x-[210%]"
            }`}
          >
            <div className="flex items-center">
              <Button
                icon={<IoArrowBackCircleSharp />}
                type="button"
                size="small"
                variant="link"
                iconSize={24}
                className="gap-2 py-0 px-0 max-lg:hidden pl-0"
                onClick={() => setIsMessageOpen(false)}
              />

              <h2 className="text-xl py-1 border-b-2 border-gray-200 inline-block mb-0 flex-auto">
                <b>
                  {thread?.tenant.firstname + " " + thread?.tenant.lastname}
                </b>{" "}
                ile Görüşme
              </h2>
            </div>

            <MessageList messages={thread?.messages} threadId={thread?.id} />
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
