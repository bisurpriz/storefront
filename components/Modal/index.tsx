"use client";

import { useEffect } from "react";
import { Transition } from "react-transition-group";
import ClientOnlyPortal from "./ClientOnlyPortal";
import { useClickAway } from "@uidotdev/usehooks";
import { AiOutlineClose } from "react-icons/ai";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    onClose?.();
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center z-50" ref={ref}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => onClose?.()}></div>
      <div
        className={`bg-white z-10 transform transition-all duration-300 
          rounded-md shadow-md max-sm:w-full max-sm:mx-auto max-sm:mt-4 max-w-screen-xl w-fit
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <AiOutlineClose className="absolute top-2 right-2 cursor-pointer" onClick={() => onClose?.()} />
        {title && <h1 className="text-2xl font-normal text-slate-700 px-8 pt-4">{title}</h1>}
        <div>{children}</div>
      </div>
    </div>
  );

  return (
    <ClientOnlyPortal selector="body">
      <Transition in={isOpen} timeout={300} mountOnEnter unmountOnExit nodeRef={ref}>
        {(state) => {
          return modalContent;
        }}
      </Transition>
    </ClientOnlyPortal>
  );
};

export default Modal;
