"use client";

import ChevronDown from "@/components/Icons/ChevronDown";
import { motion } from "motion/react";
import { useRef, useState } from "react";

interface AccordionItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  bordered?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onToggle,
  className,
  bordered,
}) => {
  const nodeRef = useRef(null);
  const [open, setOpen] = useState<boolean>(isOpen ?? false);

  const isOpenClass = open ? "border-b" : "";
  const isBordered = bordered ? "border" : "";

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    setOpen(!open);
  };

  return (
    <div
      className={`select-none transition-colors ${isBordered} ${className} whitespace-nowrap`}
    >
      <div
        className={`flex cursor-pointer items-center justify-between p-3 ${isOpenClass} `}
        onClick={handleToggle}
      >
        <h4 className="flex items-center font-medium">{title}</h4>
        <ChevronDown
          className={`-z-[1] transform transition-transform ${
            open ? "-rotate-180" : ""
          }`}
        />
      </div>
      <motion.div
        key={title.toString()}
        ref={nodeRef}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        className="overflow-hidden"
      >
        <div ref={nodeRef} className="whitespace-normal p-4">
          {content}
        </div>
      </motion.div>
    </div>
  );
};

export default AccordionItem;
