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
          "bg-gray-50 rounded-xl shadow-sm p-4",
          "border border-gray-100"
        )}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={clsx(
              "w-1/3 group p-4 rounded-lg select-none",
              "transition-transform duration-500 ease-in-out",
              "hover:bg-gray-100",
              "border-2 border-gray-200"
            )}
          >
            <div className="flex items-center justify-center group-hover:text-pink-400 text-4xl transition-colors duration-300 ease-in-out">
              {data[i].icon}
            </div>
            <p className="text-center text-sm mt-2 text-gray-400 font-light w-full">
              {data[i].title.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingSearchBanner;
