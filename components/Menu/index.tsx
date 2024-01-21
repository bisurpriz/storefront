"use client";

import Link from "next/link";
import { useMeasure } from "@uidotdev/usehooks";

const Menu: React.FC<MenuProps> = ({
  items,
  orientation = "horizontal",
  className = "",
}) => {
  const [listRef] = useMeasure<HTMLElement>();

  const emptyItemSkeleton = (
    <div className='h-10 bg-gray-200 animate-pulse'></div>
  );

  return (
    <nav
      className={`font-mono bg-transparent font-medium w-full ${className}`}
      ref={listRef}
    >
      {items ? (
        <ul
          className={`${
            orientation === "horizontal" ? "inline-flex" : "block"
          }  text-base leading-4 w-full`}
        >
          {items?.map((item, index) => (
            <li
              key={index}
              className='relative group my-2 px-4 cursor-pointer border-r last-of-type:border-r-0'
            >
              <Link
                href={item.link ?? "#"}
                className='flex items-center h-full group-hover:text-primary whitespace-nowrap'
              >
                {item.icon && <span className='mr-2'>{item.icon}</span>}
                {item.text}
              </Link>
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
