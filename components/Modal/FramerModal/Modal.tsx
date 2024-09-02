"use client";

import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import clsx from "clsx";
import useResponsive from "@/hooks/useResponsive";
import { useMemo } from "react";

const Modal = ({
  handleClose,
  children,
  open,
}: {
  handleClose?: () => void;
  children: React.ReactNode;
  open: boolean;
}) => {
  const { isTablet } = useResponsive();

  const variant = useMemo(
    () => ({
      mobileHidden: { height: 0 },
      mobileVisible: { height: "100dvh" },
      mobileExit: { height: 0 },
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    }),
    [isTablet]
  );

  return (
    <AnimationExitProvider show={open}>
      <Backdrop onClick={handleClose} key={"backdrop"}>
        <motion.div
          key={"modal"}
          onClick={(e) => e.stopPropagation()}
          variants={variant}
          className={clsx(
            "max-md:fixed max-md:w-full max-md:min-h-[100dvh] max-md:top-0 max-md:left-0 max-md:bottom-0 max-md:right-0 max-md:z-40 max-md:rounded-none",
            "w-fit h-fit flex items-center justify-center"
          )}
          initial={isTablet ? "mobileHidden" : "hidden"}
          animate={isTablet ? "mobileVisible" : "visible"}
          exit={isTablet ? "mobileExit" : "exit"}
        >
          <div className="relative max-md:h-full">
            <span className="absolute top-4 right-4 md:hidden">
              <button onClick={handleClose}>
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
          </div>
        </motion.div>
      </Backdrop>
    </AnimationExitProvider>
  );
};

export default Modal;
