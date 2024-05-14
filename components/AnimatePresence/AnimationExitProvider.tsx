import { FC } from "react";
import { AnimatePresence } from "framer-motion";

type AnimationExitProviderProps = {
  show: boolean;
  children: React.ReactNode;
};

const AnimationExitProvider: FC<AnimationExitProviderProps> = ({
  show,
  children,
}) => {
  return <AnimatePresence>{show && children}</AnimatePresence>;
};

export default AnimationExitProvider;
