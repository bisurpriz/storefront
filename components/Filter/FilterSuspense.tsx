import clsx from "clsx";
import React from "react";

const FilterSuspense = () => {
  return (
    <div
      className={clsx(
        "w-full p-2 animate-pulse rounded-md bg-slate-300 grid grid-cols-3 gap-2 mb-4"
      )}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className={clsx(
            "h-10 rounded-md  bg-slate-400 col-span-1 min-w-[200px]"
          )}
        />
      ))}
    </div>
  );
};

export default FilterSuspense;
