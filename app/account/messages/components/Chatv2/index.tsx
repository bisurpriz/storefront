"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/AuthContext";
import useChatStore from "@/store";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { sendMessage } from "../../action";
import ChatSidebar from "./ChatSidebar";
import ChatSidebarHeader from "./ChatSidebarHeader";
import { ChatUserAvatar } from "./ChatUserAvatar";
import MessageLine from "./MessageLine";
import MessageSendAction from "./MessageSendAction";
import NoConversation from "./NoConversation";
import { Message, User } from "./types";

export default function AdvancedChatScreen() {
  const { chats, addMessage } = useChatStore((state) => state);
  const { user } = useUser();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const userList: User[] = chats?.map((chat, index) => {
    return {
      id: chat.tenant.id,
      picture: chat.tenant.tenants[0].logo,
      name: chat.tenant.tenants[0].name,
      lastMessage: chat.messages[chat.messages.length - 1].message,
    };
  });

  const selectedChat = chats?.find((chat) => chat.tenant.id === selectedUser?.id);
  const messages: Message[] = selectedChat?.messages.map((message) => {
    return {
      created_at: message.created_at,
      id: message.id,
      is_read: message.is_read,
      message: message.message,
      receiver: {
        id: message.receiver.id,
        picture:
          message.receiver.id === user.id
            ? user.picture
            : selectedChat.tenant.tenants[0].logo,
        name:
          message.receiver_id === user.id
            ? user.firstname + " " + user.lastname
            : selectedChat.tenant.tenants[0].name,
        lastMessage: message.message,
      },
      sender: {
        id: message.sender.id,
        picture:
          message.sender.id === user.id
            ? user.picture
            : selectedChat.tenant.tenants[0].logo,
        name:
          message.sender_id === user.id
            ? user.firstname + " " + user.lastname
            : selectedChat.tenant.tenants[0].name,
        lastMessage: message.message,
      },
    };
  });

  const handleSendMessage = (message: Message) => {
    if (!selectedChat) return;

    // Create optimistic message
    const optimisticMessage: Message = {
      id: Date.now(), // Temporary ID
      message: newMessage,
      created_at: new Date().toISOString(),
      is_read: false,
      sender: {
        id: user.id,
        picture: user.picture,
        name: user.firstname + " " + user.lastname,
        lastMessage: newMessage
      },
      receiver: {
        id: selectedUser!.id,
        picture: selectedChat.tenant.tenants[0].logo,
        name: selectedChat.tenant.tenants[0].name,
        lastMessage: newMessage
      }
    };

    // Add optimistic message immediately
    addMessage(optimisticMessage);
    setNewMessage("");

    // Make the actual API call
    sendMessage({
      message: newMessage,
      receiver_id: selectedUser!.id,
      chat_thread_id: selectedChat.id,
    });
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  useEffect(() => {
    document.getElementById("header")?.classList.remove("sticky");
    document.getElementById("header")?.classList.add("relative");

    return () => {
      document.getElementById("header")?.classList.add("sticky");
      document.getElementById("header")?.classList.remove("relative");
    };
  }, [selectedUser]);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-full min-h-[50dvh] flex-1 flex-col bg-background max-sm:h-[70dvh] md:flex-row">
      <AnimatePresence>
        {(showUserList || windowWidth >= 768) && (
          <div className="border-r border-border md:block md:w-1/3 lg:w-1/4">
            <ChatSidebarHeader toggleUserList={toggleUserList} />
            <ChatSidebar
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              setShowUserList={setShowUserList}
              userList={userList}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(!showUserList || windowWidth >= 768) && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-1 flex-col"
          >
            {selectedUser ? (
              <div>
                <div className="flex h-16 items-center border-b border-border p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => {
                      setSelectedUser(null);
                      if (window.innerWidth < 768) {
                        setShowUserList(true);
                      }
                    }}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </Button>
                  <ChatUserAvatar user={selectedUser} />
                  <div className="ml-4 flex-1">
                    <h2 className="font-semibold">{selectedUser.name}</h2>
                  </div>
                </div>

                <div className="h-96 max-h-96 overflow-y-scroll p-4 max-sm:h-[62dvh] max-sm:max-h-[62dvh]">
                  <MessageLine messages={messages} user={user} />
                </div>
                <MessageSendAction
                  handleSendMessage={handleSendMessage}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  selectedUser={selectedUser}
                  user={user}
                />
              </div>
            ) : (
              <NoConversation />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
