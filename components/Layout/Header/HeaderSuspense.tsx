import React from "react";

const HeaderSuspense = () => {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-start gap-2">
      <div className="h-2 w-full animate-pulse rounded-lg bg-slate-400" />
      <div className="flex w-full items-center justify-between gap-12">
        <div className="h-14 w-60 animate-pulse rounded-lg bg-slate-400" />
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-400" />
        <div className="flex items-center justify-between gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 animate-pulse rounded-lg bg-slate-400"
            />
          ))}
        </div>
      </div>
      <div className="h-8 w-full animate-pulse rounded-lg bg-slate-400" />
    </div>
  );
};

export default HeaderSuspense;
