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
        <div className="relative h-12 w-12">
          {picture ? (
            <Image
              className="mx-auto h-12 w-12 rounded-full"
              src={picture}
              alt="chat-user"
              width="48"
              height="48"
            />
          ) : null}
          <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="inline-block rounded-full bg-gray-300 p-2 px-6 text-gray-700">
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
        <div className="inline-block rounded-full bg-blue-600 p-2 px-6 text-white">
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
