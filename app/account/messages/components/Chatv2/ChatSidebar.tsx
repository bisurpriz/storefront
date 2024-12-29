import { motion } from "motion/react";
import { FC } from "react";
import { ChatUserAvatar } from "./ChatUserAvatar";
import { User } from "./types";

type ChatSidebarProps = {
  userList: User[];
  selectedUser: User;
  setSelectedUser: (user: User) => void;
  setShowUserList: (show: boolean) => void;
};

const ChatSidebar: FC<ChatSidebarProps> = ({
  selectedUser,
  setSelectedUser,
  setShowUserList,
  userList,
}) => {
  return userList?.map((user) => (
    <motion.div
      key={user.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex cursor-pointer items-center p-4 hover:bg-accent ${selectedUser?.id === user.id ? "bg-accent" : ""}`}
      onClick={() => {
        setSelectedUser(user);
        if (window.innerWidth < 768) {
          setShowUserList(false);
        }
      }}
    >
      <ChatUserAvatar user={user} />
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{user.name}</h3>
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {user.lastMessage}
        </p>
      </div>
    </motion.div>
  ));
};

export default ChatSidebar;
