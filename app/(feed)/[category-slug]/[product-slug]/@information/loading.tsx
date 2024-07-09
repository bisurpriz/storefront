import React from "react";

const InformationLoadingPage = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full h-full rounded-md max-md:w-full max-md:p-2 max-md:rounded-none max-md:shadow-none">
      <div className="rounded-lg w-full flex items-start justify-start flex-col">
        <div className="h-24 w-full text-gray-800 max-w-lg mb-2 bg-slate-300 animate-pulse rounded-lg" />
        <div className="h-4 w-96 flex items-center max-md:mb-2 bg-slate-300 animate-pulse rounded-lg" />

        <div className="flex items-end justify-start gap-2 w-full mb-4 md:mt-4">
          <div className="flex items-center justify-start gap-2  w-20 h-20 bg-slate-300 animate-pulse rounded-lg" />
          <div className="w-32 bg-slate-300 animate-pulse h-20 rounded-lg" />
        </div>
        <div className="flex items-center gap-6 mb-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="w-32 h-8 bg-slate-300 animate-pulse rounded-lg"
            />
          ))}
        </div>
        <div className="w-full h-4 bg-slate-300 animate-pulse rounded-lg" />
        <div className="flex items-center justify-between w-full mt-6 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-20 bg-slate-300 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformationLoadingPage;
