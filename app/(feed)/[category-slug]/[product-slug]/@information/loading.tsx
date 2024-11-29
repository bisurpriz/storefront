import React from "react";

const InformationLoadingPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-4 rounded-md max-md:w-full max-md:rounded-none max-md:p-2 max-md:shadow-none">
      <div className="flex w-full flex-col items-start justify-start rounded-lg">
        <div className="mb-2 h-14 w-full animate-pulse rounded-lg bg-slate-300 text-gray-700" />
        <div className="flex h-4 w-96 animate-pulse items-center rounded-lg bg-slate-300 max-md:mb-2" />

        <div className="mb-4 flex w-full items-end justify-start gap-2 md:mt-4">
          <div className="flex h-20 w-20 animate-pulse items-center justify-start gap-2 rounded-lg bg-slate-300" />
          <div className="h-20 w-32 animate-pulse rounded-lg bg-slate-300" />
          <div className="ml-auto h-4 w-1/2 animate-pulse rounded-lg bg-slate-300" />
        </div>
        <div className="mb-2 flex items-center gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-32 animate-pulse rounded-lg bg-slate-300"
            />
          ))}
        </div>
        <div className="mb-4 flex w-full items-center justify-between gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 w-full animate-pulse rounded-lg bg-slate-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformationLoadingPage;
