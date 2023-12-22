import MessageItem from "./MessageItem";

const data = {
  type: "sent" as "sent" | "received",
  message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  date: "12:00 PM",
  picture: "https://tailwindcss-chat.vercel.app/resources/profile-image.png",
};

const MessageList = (props) => {
  return (
    <div className="messages flex-1 overflow-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <MessageItem key={item} {...data} type={item % 2 === 0 ? "sent" : "received"} />
      ))}
    </div>
  );
};

export default MessageList;
