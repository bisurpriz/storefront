import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import Link from "next/link";
import React, { FC, useRef, useState } from "react";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";
import { motion } from "framer-motion";

const popupAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 30,
  },
};

type DropdownProps = {
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
};

const NewDropdown: FC<DropdownProps> = ({ placement = "topLeft" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    key: string;
    value: string;
  } | null>(null);

  const containerRef = useClickAway<HTMLDivElement>(() => setIsOpen(false));
  const popupRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  const position = (() => {
    switch (placement) {
      case "topRight":
        return "origin-top-right right-0";
      case "bottomLeft":
        return "origin-bottom-left";
      case "bottomRight":
        return "origin-bottom-right right-0";
      case "topLeft":
      default:
        return "origin-top-left";
    }
  })();

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggle}
        >
          {selectedItem ? selectedItem.value : "Select"}
          <svg
            className={clsx(
              "-mr-1 h-5 w-5 text-gray-400",
              isOpen ? "transform rotate-180" : "",
              // animated turn
              "transition-transform duration-200 ease-in-out"
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <AnimationExitProvider show={isOpen}>
        <motion.div
          ref={popupRef}
          className={clsx(
            "absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            position
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={popupAnimation.transition}
          variants={popupAnimation}
        >
          <div className="py-1" role="none">
            {Array.from({ length: 5 }).map((_, index) => (
              <Link
                href="#"
                className={clsx(
                  "text-gray-700 block px-4 py-2 text-sm",
                  "odd:bg-gray-50 even:bg-white hover:bg-gray-100"
                )}
                role="menuitem"
                tabIndex={-1}
                id={`menu-item-${index}`}
                key={index}
                onClick={() => {
                  setSelectedItem({
                    key: `${index}`,
                    value: `Item ${index + 1}`,
                  });
                  toggle();
                }}
              >
                {Math.pow(2, index)}
              </Link>
            ))}
          </div>
        </motion.div>
      </AnimationExitProvider>
    </div>
  );
};

export default NewDropdown;
