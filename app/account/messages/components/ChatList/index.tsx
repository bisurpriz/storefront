import { localeFormat } from "@/utils/format";
import ChatItem, { IChatItem } from "./ChatItem";

const ChatList = ({ onMessageSelect, chats }: { onMessageSelect: IChatItem["onMessageSelect"]; chats: any[] }) => {
  return (
    <div className="flex-1 h-full overflow-auto px-2">
      {chats.map((item) => {
        const date = item?.messages?.[0]?.created_at
          ? localeFormat(item?.messages.length > 0 ? new Date(item.messages[0].created_at) : undefined, "PPP")
          : "";

        return (
          <ChatItem
            key={item.id}
            name={item?.tenant?.firstname + " " + item?.tenant?.lastname}
            message={item?.messages?.length > 0 ? item.messages?.[0]?.message : ""}
            date={date}
            unread={item?.messages?.length}
            imgPath={item.tenant?.picture}
            onMessageSelect={onMessageSelect}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
