"use client";

import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

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
}: {
  handleClose?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute top-0 left-0 right-0 bottom-0 m-auto w-screen h-screen flex items-center justify-center md:w-1/2 md:h-fit"
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
