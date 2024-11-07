import clsx from "clsx";
import React from "react";

const FilterSuspense = () => {
  return (
    <div
      className={clsx(
        "mb-4 grid w-full animate-pulse grid-cols-3 gap-2 rounded-md bg-slate-300 p-2",
      )}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className={clsx(
            "col-span-1 h-10 min-w-[200px] rounded-md bg-slate-400",
          )}
        />
      ))}
    </div>
  );
};

export default FilterSuspense;
