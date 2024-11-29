import React from "react";

const ActionPageLoading = () => {
  return (
    <div className="mt-6 flex w-full items-end justify-start gap-4">
      <div className="h-16 w-full animate-pulse rounded-lg bg-slate-300" />
      <div className="h-16 w-28 animate-pulse rounded-lg bg-slate-300" />
    </div>
  );
};

export default ActionPageLoading;
