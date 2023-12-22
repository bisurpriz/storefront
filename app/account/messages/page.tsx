import ChatList from "./components/ChatList";
import MessageList from "./components/Message/MessageList";

const MessagesPage = () => {
  return (
    <div className="flex-1 flex h-full">
      <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
        <div className="search flex-2 pb-6 px-2">
          <input
            type="text"
            className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
            placeholder="Search"
          />
        </div>
        <ChatList />
      </div>

      <div className="chat-area flex-1 flex flex-col">
        <div className="flex-3">
          <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
            Chatting with <b>Mercedes Yemelyan</b>
          </h2>
        </div>

        <MessageList />
      </div>
    </div>
  );
};

export default MessagesPage;
