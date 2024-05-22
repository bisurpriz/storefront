"use client";
import clsx from "clsx";
import React, { FC, useMemo } from "react";

type TailwindBgColorsTpye =
  | "purple"
  | "green"
  | "red"
  | "yellow"
  | "blue"
  | "indigo"
  | "pink"
  | "gray"
  | "teal"
  | "orange";

export type Stamp = {
  name: string;
  // actually it should be string html svg
  icon: string;
  color: TailwindBgColorsTpye;
};

type ProductCardStampsProps = {
  stamps: Stamp[] | null;
  id: string;
};

const ProductCardStamps: FC<ProductCardStampsProps> = ({ stamps }) => {
  const gradients: Record<TailwindBgColorsTpye, string> = {
    purple: "bg-gradient-to-r from-purple-100 to-purple-200",
    green: "bg-gradient-to-r from-green-100 to-green-200",
    red: "bg-gradient-to-r from-red-100 to-red-200",
    yellow: "bg-gradient-to-r from-yellow-100 to-yellow-200",
    blue: "bg-gradient-to-r from-blue-100 to-blue-200",
    indigo: "bg-gradient-to-r from-indigo-100 to-indigo-200",
    pink: "bg-gradient-to-r from-pink-100 to-pink-200",
    gray: "bg-gradient-to-r from-gray-100 to-gray-200",
    teal: "bg-gradient-to-r from-teal-100 to-teal-200",
    orange: "bg-gradient-to-r from-orange-100 to-orange-200",
  };

  const textColors: Record<TailwindBgColorsTpye, string> = {
    purple: "text-purple-700",
    green: "text-green-700",
    red: "text-red-700",
    yellow: "text-yellow-700",
    blue: "text-blue-700",
    indigo: "text-indigo-700",
    pink: "text-pink-700",
    gray: "text-gray-700",
    teal: "text-teal-700",
    orange: "text-orange-700",
  };

  const itemObject = useMemo(() => {
    if (!stamps) return null;
    return {
      firstThree: stamps.slice(0, 3),
      rest: stamps.slice(2),
    };
  }, [stamps]);

  if (!stamps) return null;

  return (
    <div
      className={clsx(
        "flex flex-col gap-1 mt-2 flex-wrap absolute right-2 top-0 items-end"
      )}
    >
      {itemObject.firstThree.map((stamp, index) => {
        const colors = {
          gradient: gradients[stamp.color],
          text: textColors[stamp.color],
        };

        return (
          <div
            key={index}
            className={`w-fit flex  items-center gap-1 px-1 py-1 rounded-tl-lg rounded-br-lg text-xs ${colors.gradient} ${colors.text} shadow-md`}
          >
            <span>{stamp.icon}</span>
            <span>{stamp.name}</span>
          </div>
        );
      })}

      {itemObject.rest.length > 0 && (
        <div
          className={`w-fit flex items-center gap-1 px-1 py-1 rounded-tl-lg rounded-br-lg text-xs bg-gray-100 text-gray-700 shadow-md`}
        >
          <span>+{itemObject.rest.length}</span>
        </div>
      )}
    </div>
  );
};

export default ProductCardStamps;
