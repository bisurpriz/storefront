import { localeFormat } from "@/utils/format";
import ChatItem, { IChatItem } from "./ChatItem";
import ChatItemSkeleton from "./ChatItemSkeleton";
import { useClaims } from "@/hooks/useClaims";

const calculateUnread = (messages: any[], userId: String) => {
  const unread = messages.filter((item) => item.sender.id !== userId && !item.is_read);
  return unread.length;
};

const ChatList = ({
  onMessageSelect,
  chats,
}: {
  onMessageSelect: IChatItem["onMessageSelect"];
  chats: any[] | null;
}) => {
  const {
    claims: { id },
  } = useClaims();
  return (
    <div className="flex-1 h-full overflow-auto px-2">
      {!chats ? (
        <ChatItemSkeleton />
      ) : (
        chats.map((item) => {
          const date = item?.messages?.[0]?.created_at
            ? localeFormat(item?.messages.length > 0 ? new Date(item.messages[0].created_at) : undefined, "PPP")
            : "";
          const unread = calculateUnread(item.messages, id);
          return (
            <ChatItem
              key={item.id}
              name={item?.tenant?.firstname + " " + item?.tenant?.lastname}
              message={item?.messages?.length > 0 ? item.messages?.slice(-1)?.[0]?.message : ""}
              date={date}
              imgPath={item.tenant?.picture}
              tenantId={item.tenant.id}
              onMessageSelect={onMessageSelect}
              unRead={unread}
            />
          );
        })
      )}
    </div>
  );
};

export default ChatList;
