const MessageItemSkeleton = ({ type }: { type: "sent" | "received" }) => {
  return type === "received" ? (
    <div className="mt-4 flex w-[48%] animate-pulse space-x-4">
      <div className="h-10 w-10 rounded-full bg-slate-400"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-slate-400"></div>
        <div className="space-y-3">
          <div className="h-2 rounded bg-slate-400"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="ml-auto mt-4 w-[48%] flex-1 animate-pulse space-x-4 text-right">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-slate-400"></div>
        <div className="space-y-3">
          <div className="h-2 rounded bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageItemSkeleton;
