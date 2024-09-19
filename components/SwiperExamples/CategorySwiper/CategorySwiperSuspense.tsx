import clsx from "clsx";
import React from "react";

const CategorySwiperSuspense = () => {
  return (
    <div className={clsx("w-full overflow-hidden h-[150px] whitespace-nowrap")}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="inline-block last:mr-0 mr-[10px]">
          <div
            className={clsx(
              "w-[130px] h-[130px] bg-gray-100 rounded-full",
              "animate-pulse",
              ""
            )}
          />
          <span
            className={clsx(
              "block h-4 bg-gray-100 rounded-lg",
              "mt-1",
              "w-full",
              "animate-pulse"
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default CategorySwiperSuspense;
