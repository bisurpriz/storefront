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
    <div className="col-span-5 max-xl:col-span-full self-center max-md:hidden">
      <div className="grid grid-cols-3">
        {data.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center justify-center gap-2 px-4 my-4 group select-none",
              "border-r border-gray-200 last:border-r-0 first:border-l",
              "max-xl:first:border-l-0 max-xl:m-0"
            )}
          >
            <span
              className={clsx(
                "text-5xl text-gray-400",
                "transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:text-emerald-400",
                "max-lg:text-4xl max-md:text-3xl"
              )}
            >
              {item.icon}
            </span>
            <h5 className="text-sm font-thin text-gray-500 uppercase group-hover:font-normal max-sm:hidden">
              {item.title}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingSearchBanner;
