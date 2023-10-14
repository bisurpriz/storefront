"use client";
import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

interface AccordionItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onToggle,
}) => {
  const nodeRef = useRef(null);

  return (
    <div className="mb-4">
      <div
        className="border p-3 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center">{title}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform ${
            isOpen ? "rotate-180" : ""
          } transition-transform`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          />
        </svg>
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: "accordion-content-enter",
          enterActive: "accordion-content-enter-active",
          exit: "accordion-content-exit",
          exitActive: "accordion-content-exit-active",
        }}
      >
        <div ref={nodeRef} className="border p-4">
          {content}
        </div>
      </CSSTransition>
    </div>
  );
};

interface AccordionProps {
  items: { title: React.ReactNode; content: React.ReactNode }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [accordionData, setAccordionData] = useState(
    items.map(() => ({ isOpen: false }))
  );

  const handleToggle = (index: number) => {
    setAccordionData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <div className="mx-auto">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={accordionData[index].isOpen}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
