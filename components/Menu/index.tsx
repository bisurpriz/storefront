"use client";

import Link from "next/link";
import { useMeasure } from "@uidotdev/usehooks";
import clsx from "clsx";

const Menu: React.FC<MenuProps> = ({ items, className = "" }) => {
  const [listRef] = useMeasure<HTMLElement>();

  const emptyItemSkeleton = (
    <div className="h-10 bg-gray-200 animate-pulse"></div>
  );

  return (
    <nav
      className={`font-mono bg-white font-medium ${className}`}
      ref={listRef}
    >
      {items ? (
        <ul className={clsx("flex justify-center gap-4 w-fit")}>
          {items.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="text-base text-gray-500 hover:text-gray-700"
              >
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
