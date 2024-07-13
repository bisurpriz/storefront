import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import useResponsive from "@/hooks/useResponsive";
import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import { Variants, motion } from "framer-motion";
import { FC } from "react";

type AnimatedFilterBoxProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  className?: string;
};

const AnimatedFilterBox: FC<AnimatedFilterBoxProps> = ({
  children,
  isOpen,
  handleClose,
  className,
}) => {
  const { isTablet } = useResponsive();

  const subMenuVariants: Variants = isTablet
    ? {
        initial: { height: 0 },
        enter: { height: "auto" },
        exit: { height: 0 },
        transition: {
          type: "easeInOut",
        },
      }
    : {
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: {
          type: "spring",
        },
      };

  return (
    <>
      <AnimationExitProvider show={isOpen}>
        {isTablet && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        <motion.div
          key="submenu"
          className={clsx(
            "absolute bg-white border border-gray-200 rounded-md mt-2 max-h-96 z-50 min-w-fit w-[300px]",
            "max-md:w-full max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:h-auto max-h-[65vh]",
            className
          )}
          variants={subMenuVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={subMenuVariants.transition}
        >
          {children}
        </motion.div>
      </AnimationExitProvider>
    </>
  );
};

export default AnimatedFilterBox;
