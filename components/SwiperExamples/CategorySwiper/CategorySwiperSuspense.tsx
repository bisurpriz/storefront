import clsx from "clsx";
import React from "react";

const CategorySwiperSuspense = () => {
  return (
    <div
      className={clsx(
        "w-full p-4 flex items-center justify-between gap-4 rounded-lg animate-pulse bg-slate-300 overflow-hidden mb-4"
      )}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div className="flex flex-col gap-2" key={i}>
          <div key={i} className={clsx("w-24 h-20 bg-gray-200 rounded-lg")} />
          <div className={clsx("w-24 h-2 bg-gray-200 rounded-lg")} />
        </div>
      ))}
    </div>
  );
};

export default CategorySwiperSuspense;
