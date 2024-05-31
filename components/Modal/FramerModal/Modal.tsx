"use client";

import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import clsx from "clsx";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({
  handleClose,
  children,
  open,
}: {
  handleClose?: () => void;
  children: React.ReactNode;
  open: boolean;
}) => {
  return (
    <AnimationExitProvider show={open}>
      <Backdrop onClick={handleClose} key={"backdrop"}>
        <motion.div
          key={"modal"}
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={clsx(
            "max-md:fixed max-md:w-full max-md:h-full max-md:top-0 max-md:left-0 max-md:bottom-0 max-md:right-0 max-md:z-50 max-md:rounded-none"
          )}
        >
          <span className="absolute top-4 right-4 md:hidden">
            <button onClick={handleClose} className="bg-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
          {children}
        </motion.div>
      </Backdrop>
    </AnimationExitProvider>
  );
};

export default Modal;
