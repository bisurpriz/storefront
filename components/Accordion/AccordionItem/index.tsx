"use client";

import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { HiChevronDown } from "react-icons/hi";

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
  const isBordered = bordered ? "border border-b-0 last:border-b" : "";

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    setOpen(!open);
  };

  return (
    <div
      className={` transition-colors select-none ${isBordered} ${className} whitespace-nowrap`}
    >
      <div
        className={`p-3 cursor-pointer flex justify-between items-center ${isOpenClass} `}
        onClick={handleToggle}
      >
        <h4 className="flex items-center">{title}</h4>
        <HiChevronDown
          className={`transition-transform transform ${
            open ? "-rotate-180" : ""
          }`}
        />
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={100}
        unmountOnExit
        classNames={{
          enter: "accordion-content-enter",
          enterActive: "accordion-content-enter-active",
          exit: "accordion-content-exit",
          exitActive: "accordion-content-exit-active",
        }}
      >
        <div ref={nodeRef} className="p-4">
          {content}
        </div>
      </CSSTransition>
    </div>
  );
};

export default AccordionItem;
