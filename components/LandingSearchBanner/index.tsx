import React from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineSentimentSatisfiedAlt } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import clsx from "clsx";

const data = [
  {
    icon: <IoGiftOutline />,
    title: "En güzel hediyeler",
  },
  {
    icon: <MdOutlineSentimentSatisfiedAlt />,
    title: "Yüzünüzde gülümseme",
  },
  {
    icon: <AiOutlineSafety />,
    title: "Güvenli alışveriş",
  },
];

const LandingSearchBanner = () => {
  return (
    <div className="col-span-4 max-md:hidden max-xl:col-span-full self-center">
      <div
        className={clsx(
          "w-full flex items-center justify-between gap-3",
          "bg-purple-50 rounded-xl shadow-sm p-4",
          "border border-purple-100"
        )}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={clsx(
              "w-1/3 group p-4 rounded-lg select-none",
              "transition-transform duration-500 ease-in-out",
              "hover:bg-purple-100",
              "border-2 border-purple-200"
            )}
          >
            <div className="flex items-center justify-center text-gray-500 group-hover:text-purple-800 text-4xl transition-colors duration-300 ease-in-out">
              {data[i].icon}
            </div>
            <p className="text-center text-sm mt-2 text-gray-500 group-hover:text-purple-800 font-light w-full">
              {data[i].title.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingSearchBanner;
