const MessageItemSkeleton = ({ type }: { type: 'sent' | 'received' }) => {
  return type === 'received' ? (
    <div className="animate-pulse flex space-x-4 w-[48%] mt-4">
      <div className="rounded-full bg-slate-400 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-400 rounded"></div>
        <div className="space-y-3">
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="animate-pulse flex-1 space-x-4 w-[48%] mt-4 text-right ml-auto">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-400 rounded"></div>
        <div className="space-y-3">
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageItemSkeleton;
