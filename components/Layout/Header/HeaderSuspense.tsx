import React from "react";

const HeaderSuspense = () => {
  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-start gap-2">
      <div className="bg-slate-400 animate-pulse w-full h-2 rounded-lg" />
      <div className="flex items-center justify-between w-full gap-12">
        <div className="bg-slate-400 animate-pulse w-60 h-14 rounded-lg" />
        <div className="bg-slate-400 animate-pulse w-full h-10 rounded-lg" />
        <div className="flex items-center justify-between gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-400 animate-pulse w-10 h-10 rounded-lg"
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-400 animate-pulse w-full h-8 rounded-lg" />
    </div>
  );
};

export default HeaderSuspense;
