"use client";
import { useState } from "react";
import ChatList from "./ChatList";
import Button from "@/components/Button";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import MessageList from "./Message/MessageList";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_CHATS } from "@/graphql/queries/chat/subscription";
import Input from "./Message/Input";
import { sendMessage } from "../action";

const Main = ({ tenantId }: { tenantId?: string }) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const { data, error } = useSubscription(SUBSCRIBE_TO_CHATS);

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

  const handleMessage = async () => {
    await sendMessage({ message: "test", receiver_id: tenantId, chat_thread_id: thread?.id });
  };

  const thread = data?.chat_thread.find((item) => item.tenant.id === tenantId);

  return (
    <>
      <div className="flex-1 flex relative h-full">
        <div
          className={`sidebar w-full g:flex flex-2 flex-col pr-6 transition-all duration-300  ${
            !isMessageOpen ? "translate-x-0" : "-translate-x-[110%]"
          }`}
        >
          <div className="search flex-2 pb-6 px-2">
            <input
              type="text"
              className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
              placeholder="Search"
            />
          </div>
          <ChatList onMessageSelect={() => setIsMessageOpen(true)} chats={data?.chat_thread ?? []} />
        </div>

        <div
          className={`chat-area flex-1 flex flex-col absolute w-full top-0 transition-all duration-300 h-full  ${
            isMessageOpen ? "translate-x-0" : "-translate-x-[110%]"
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
              <b>{thread?.tenant.firstname + " " + thread?.tenant.lastname}</b> ile Görüşme
            </h2>
          </div>

          <MessageList messages={thread?.messages ?? []} />
          <Input onMessageSend={handleMessage} />
        </div>
      </div>
    </>
  );
};

export default Main;
