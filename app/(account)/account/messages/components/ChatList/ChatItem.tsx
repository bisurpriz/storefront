import Image from "next/image";

export interface IChatItem {
  name: string;
  message: string;
  date: string;
  imgPath: string;
  tenantId: string;
  unRead: number;
  onMessageSelect: (tenantId: string) => void;
}

const ChatItem = ({
  name,
  message,
  date,
  unRead,
  imgPath,
  onMessageSelect,
  tenantId,
}: IChatItem) => {
  return (
    <div
      className="entry mb-4 flex transform cursor-pointer rounded bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105"
      onClick={() => onMessageSelect(tenantId)}
    >
      <div className="flex-2">
        <div className="relative h-12 w-12">
          {imgPath ? (
            <Image
              className="mx-auto h-12 w-12 rounded-full"
              src={imgPath}
              alt="chat-user"
              width="48"
              height="48"
            />
          ) : null}
          <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-400"></span>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="w-32 truncate">
          <span className="text-gray-700">{name}</span>
        </div>
        <div>
          <small className="text-gray-600">{message}</small>
        </div>
      </div>
      <div className="flex-2 text-right">
        <div>
          <small className="text-gray-500">{date}</small>
        </div>
        <div>
          {unRead > 0 && (
            <small className="inline-block h-6 w-6 rounded-full bg-red-500 text-center text-xs leading-6 text-white">
              {unRead}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
