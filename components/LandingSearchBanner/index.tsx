import React from "react";
import clsx from "clsx";
import Safety from "../Icons/Safety";
import Gift from "../Icons/Gift";
import Sentiment from "../Icons/Sentiment";

const data = [
  {
    icon: <Gift />,
    title: "En güzel hediyeler",
  },
  {
    icon: <Sentiment />,
    title: "Yüzünüzde gülümseme",
  },
  {
    icon: <Safety />,
    title: "Güvenli alışveriş",
  },
];

const LandingSearchBanner = () => {
  return (
    <div className="col-span-5 max-xl:col-span-full self-center max-md:hidden py-4 w-full">
      <div className="grid grid-cols-3">
        {data.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center justify-center gap-2 px-4 my-4 group select-none",
              "border-r border-gray-200 first:border-l",
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
