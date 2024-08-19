import { FC } from "react";
import { AnimatePresence, AnimatePresenceProps } from "framer-motion";

type AnimationExitProviderProps = {
  show: boolean;
  children: React.ReactNode;
  mode?: AnimatePresenceProps["mode"];
};

const AnimationExitProvider: FC<AnimationExitProviderProps> = ({
  show,
  children,
  mode = "sync",
}) => {
  return (
    <AnimatePresence mode={mode}>{show ? children : null}</AnimatePresence>
  );
};

export default AnimationExitProvider;
