import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import useResponsive from "@/hooks/useResponsive";
import clsx from "clsx";
import { Variants, motion } from "framer-motion";
import { FC, useEffect } from "react";

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

  useEffect(() => {
    if (isTablet) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isTablet, isOpen]);

  return (
    <>
      <AnimationExitProvider show={isOpen}>
        {isTablet && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        <motion.div
          key="submenu"
          className={clsx(
            "absolute z-50 mt-2 max-h-96 w-[300px] min-w-fit rounded-md border border-gray-200 bg-white",
            "max-h-[65vh] max-md:fixed max-md:bottom-[72px] max-md:left-0 max-md:right-0 max-md:h-auto max-md:w-full max-md:rounded-bl-none max-md:rounded-br-none max-sm:bottom-14",
            className,
          )}
          variants={subMenuVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{
            ...subMenuVariants.transition,
            duration: 0.2,
          }}
        >
          {children}
        </motion.div>
      </AnimationExitProvider>
    </>
  );
};

export default AnimatedFilterBox;
