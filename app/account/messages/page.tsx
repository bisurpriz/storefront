"use client";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import ChatList from "./components/ChatList";
import MessageList from "./components/Message/MessageList";
import Button from "@/components/Button";
import { useState } from "react";

const MessagesPage = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  return (
    <div className="flex-1 flex h-full relative">
      <div
        className={`sidebar w-full g:flex flex-2 flex-col pr-6 transition-all duration-300 ${
          !isMessageOpen ? "ml-0" : "-ml-[800px]"
        }`}
      >
        <div className="search flex-2 pb-6 px-2">
          <input
            type="text"
            className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
            placeholder="Search"
          />
        </div>
        <ChatList onMessageSelect={() => setIsMessageOpen(true)} />
      </div>

      <div
        className={`chat-area flex-1 flex flex-col absolute w-full transition-all duration-300 ${
          isMessageOpen ? "ml-0" : "-ml-[800px]"
        }`}
      >
        <div className="flex items-center  mb-4">
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
            Chatting with <b>Mercedes Yemelyan</b>
          </h2>
        </div>

        <MessageList />
      </div>
    </div>
  );
};

export default MessagesPage;
