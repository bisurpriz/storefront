"use client";

import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";

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
      <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </Backdrop>
    </AnimationExitProvider>
  );
};

export default Modal;
