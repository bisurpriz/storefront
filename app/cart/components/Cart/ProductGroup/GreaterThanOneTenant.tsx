import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import { motion } from "motion/react";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
  show: boolean;
};

const variant = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const GreaterThanOneTenant: FC<Props> = ({ children, show }) => {
  return (
    <AnimationExitProvider show={show}>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variant}
      >
        {children}
      </motion.div>
    </AnimationExitProvider>
  );
};

export default GreaterThanOneTenant;
