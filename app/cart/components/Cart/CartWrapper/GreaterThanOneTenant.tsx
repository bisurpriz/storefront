import { FC } from "react";
import { motion } from "framer-motion";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  show: boolean;
};

const variant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const GreaterThanOneTenant: FC<Props> = ({ children, show }) => {
  return (
    <AnimationExitProvider show={show}>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variant}
        className={clsx(
          "text-xs text-red-500",
          "bg-red-100 p-2 rounded-lg",
          "transition-all duration-200",
          "border border-red-200",
          "tracking-wider",
          "overflow-hidden"
        )}
      >
        {children}
      </motion.div>
    </AnimationExitProvider>
  );
};

export default GreaterThanOneTenant;
