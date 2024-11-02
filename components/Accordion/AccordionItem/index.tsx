"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ChevronDown from "@/components/Icons/ChevronDown";

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
      className={`transition-colors select-none ${isBordered} ${className} whitespace-nowrap`}
    >
      <div
        className={`p-3 cursor-pointer flex justify-between items-center ${isOpenClass} `}
        onClick={handleToggle}
      >
        <h4 className="flex items-center font-medium">{title}</h4>
        <ChevronDown
          className={`transition-transform transform -z-[1] ${
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
        <div ref={nodeRef} className="p-4 whitespace-normal">
          {content}
        </div>
      </motion.div>
    </div>
  );
};

export default AccordionItem;
