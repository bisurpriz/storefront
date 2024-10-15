"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { CustomStar } from "./CustomStar";

interface RatingProps {
  defaultValue?: number;
  emptyIcon?: React.ReactNode;
  fullIcon?: React.ReactNode;
  halfIcon?: React.ReactNode;
  max?: number;
  onChange?: (value: number) => void;
  precision?: number;
  readOnly?: boolean;
  value?: number;
  disabled?: boolean;
  tooltips?: string[];
}

const Rating: React.FC<RatingProps> = ({
  defaultValue = 0,
  emptyIcon = (
    <CustomStar
      className="text-slate-400  w-4 h-4"
      width={20}
      height={20}
      fill="none"
    />
  ),
  fullIcon = (
    <CustomStar
      className="text-yellow-400 w-4 h-4"
      width={20}
      height={20}
      fill="currentColor"
    />
  ),

  max = 5,
  onChange,
  precision = 1,
  readOnly = false,
  value,
  disabled = false,
  tooltips = [],
}) => {
  const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState(0);

  const handleMouseEnter = (index: number) => {
    if (!readOnly && !disabled) {
      setHover(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly && !disabled) {
      setHover(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && !disabled) {
      setRating(index);
      if (onChange) {
        onChange(index);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (readOnly || disabled) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      const newValue = Math.max((value || rating) - precision, 0);
      setRating(newValue);
      onChange?.(newValue);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      const newValue = Math.min((value || rating) + precision, max);
      setRating(newValue);
      onChange?.(newValue);
    }
  };

  const displayValue = value !== undefined ? value : rating;

  return (
    <div
      className={clsx("flex", {
        "cursor-default select-none pointer-events-none": readOnly || disabled,
      })}
      role="radiogroup"
      aria-disabled={disabled}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {[...Array(max)].map((_, index) => {
        const preciseIndex = (index + 1) * precision;
        const isFull = displayValue >= preciseIndex;

        const isHovered = hover >= preciseIndex;

        return (
          <span
            key={index}
            className={clsx(
              "relative group cursor-pointer select-none transition-colors duration-300",
              { "text-gray-400": !isFull && !isHovered },
              { "text-yellow-500": isFull || isHovered },
              { "cursor-not-allowed": readOnly || disabled }
            )}
            onMouseEnter={() => handleMouseEnter(preciseIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(preciseIndex)}
            role="radio"
            aria-checked={isFull}
          >
            {isFull || isHovered ? fullIcon : emptyIcon}
            {tooltips[index] && (
              <span className="absolute bottom-full mb-1 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap">
                {tooltips[index]}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
