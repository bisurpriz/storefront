import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

interface AccordionItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
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

  const isOpenClass = isOpen ? "bg-stone-50" : "";
  const isBordered = bordered ? "border border-b-0 last:border-b" : "";

  return (
    <div
      className={` transition-colors ${isOpenClass} ${isBordered} ${className}`}
    >
      <div
        className="p-3 cursor-pointer flex justify-between items-center "
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
