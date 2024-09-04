import Image from "next/image";

export interface IMessageItem {
  type: "sent" | "received";
  message: string;
  date: string;
  picture?: string;
}

const MessageItem = ({ type, message, date, picture }: IMessageItem) => {
  return type === "received" ? (
    <div className="message mb-4 flex">
      <div className="flex-2">
        <div className="w-12 h-12 relative">
          {picture ? (
            <Image
              className="w-12 h-12 rounded-full mx-auto"
              src={picture}
              alt="chat-user"
              width="48"
              height="48"
            />
          ) : null}
          <span className="absolute w-4 h-4 bg-green-500 rounded-full right-0 bottom-0 border-2 border-white"></span>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
          <span>{message}</span>
        </div>
        <div className="pl-4">
          <small className="text-gray-500">{date}</small>
        </div>
      </div>
    </div>
  ) : (
    <div className="message me mb-4 flex text-right">
      <div className="flex-1 px-2">
        <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
          <span>{message}</span>
        </div>
        <div className="pr-4">
          <small className="text-gray-500">{date}</small>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
