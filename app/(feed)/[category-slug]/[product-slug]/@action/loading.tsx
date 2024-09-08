import React from "react";

const ActionPageLoading = () => {
  return (
    <div className="flex items-end justify-start gap-4 w-full mt-6">
      <div className="w-full h-16 bg-slate-300 animate-pulse rounded-lg" />
      <div className="w-28 h-16 bg-slate-300 animate-pulse rounded-lg" />
    </div>
  );
};

export default ActionPageLoading;
