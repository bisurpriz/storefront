import clsx from "clsx";
import React from "react";

const CategorySwiperSuspense = () => {
  return (
    <div
      className={clsx(
        "w-full py-2 flex items-center justify-between gap-2 overflow-hidden"
      )}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div className="flex flex-col gap-2" key={i}>
          <div
            key={i}
            className={clsx("w-[130px] h-[112px] bg-gray-200 rounded-lg")}
          />
          <div className={clsx("w-32 h-2 bg-gray-200 rounded-lg")} />
        </div>
      ))}
    </div>
  );
};

export default CategorySwiperSuspense;
