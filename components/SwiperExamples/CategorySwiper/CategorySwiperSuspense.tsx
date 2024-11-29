import clsx from "clsx";
import React from "react";

const CategorySwiperSuspense = () => {
  return (
    <div className={clsx("h-[150px] w-full overflow-hidden whitespace-nowrap")}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="mr-[10px] inline-block last:mr-0">
          <div
            className={clsx(
              "h-[130px] w-[130px] rounded-full bg-gray-100",
              "animate-pulse",
              "",
            )}
          />
          <span
            className={clsx(
              "block h-4 rounded-lg bg-gray-100",
              "mt-1",
              "w-full",
              "animate-pulse",
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default CategorySwiperSuspense;
