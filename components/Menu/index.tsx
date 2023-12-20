"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useMeasure } from "@uidotdev/usehooks";

const Menu: React.FC<MenuProps> = ({
  items,
  orientation = "horizontal",
  className = "",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [listRef] = useMeasure<HTMLElement>();

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const emptyItemSkeleton = (
    <div className="h-10 bg-gray-200 animate-pulse"></div>
  );

  return (
    <nav
      className={`font-mono bg-transparent font-semibold w-full ${className}`}
      ref={listRef}
    >
      {items ? (
        <ul
          className={`${
            orientation === "horizontal" ? "inline-flex" : "block"
          }  text-base font-normal leading-4 w-full`}
        >
          {items?.map((item, index) => (
            <li
              key={index}
              className="relative group my-2 px-4 cursor-pointer border-r last-of-type:border-r-0"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.link ?? "#"}
                className="flex items-center h-full group-hover:text-primary whitespace-nowrap"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.text}
              </Link>
              {item.subMenuItems && (
                <div
                  className={`${
                    hoveredIndex === index ? "block" : "hidden"
                  } absolute z-10 left-0 mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-72 md:w-96 `}
                >
                  <ul className="space-y-2">
                    {item.subMenuItems.map((subMenuItem, subIndex) => (
                      <li key={subIndex}>
                        {subMenuItem.icon && (
                          <span className="mr-2">{subMenuItem.icon}</span>
                        )}
                        <Link
                          href={subMenuItem.link ?? "#"}
                          className="block py-2 px-4 text-gray-600 hover:text-primary-dark"
                        >
                          {subMenuItem.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        emptyItemSkeleton
      )}
    </nav>
  );
};

export default Menu;
