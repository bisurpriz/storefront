"use client";

import { Link } from "@/components/Link";
import { useMeasure } from "@uidotdev/usehooks";
import clsx from "clsx";

const Menu: React.FC<MenuProps> = ({ items, className = "" }) => {
  const [listRef] = useMeasure<HTMLElement>();

  const emptyItemSkeleton = (
    <div className="h-10 animate-pulse bg-gray-200"></div>
  );

  return (
    <nav
      className={`bg-white font-mono font-medium ${className}`}
      ref={listRef}
    >
      {items ? (
        <ul className={clsx("flex w-fit justify-center gap-4")}>
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
