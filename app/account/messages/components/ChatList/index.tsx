import ChatItem from "./ChatItem";

const data = {
  name: "John Doe",
  message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  date: "12:00 PM",
  unread: 2,
};

const ChatList = ({ onMessageSelect }: { onMessageSelect: () => void }) => {
  return (
    <div className="flex-1 h-full overflow-auto px-2" onClick={onMessageSelect}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <ChatItem key={item} {...data} />
      ))}
    </div>
  );
};

export default ChatList;
