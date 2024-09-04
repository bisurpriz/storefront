import React from "react";

const ActionPageLoading = () => {
  return (
    <div className="flex items-end justify-start gap-4 w-full mt-6">
      <div className="w-52 h-20 bg-slate-300 animate-pulse rounded-lg" />
      <div className="w-20 h-20 bg-slate-300 animate-pulse rounded-lg" />
      <div className="w-16 h-4 bg-slate-300 animate-pulse rounded-lg" />
    </div>
  );
};

export default ActionPageLoading;
