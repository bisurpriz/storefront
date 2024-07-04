import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
  children: ReactNode;
  hasCloseButton?: boolean;
}

interface PopupHookProps {
  hasCloseButton?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  closePopup,
  children,
  hasCloseButton,
}) => {
  return (
    <AnimationExitProvider show={isOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className="bg-white rounded-lg p-6 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {hasCloseButton && (
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={closePopup}
            >
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
          )}
          {children}
        </motion.div>
      </div>
    </AnimationExitProvider>
  );
};

const usePopup = (props?: PopupHookProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const renderPopup = (children: ReactNode) => (
    <Popup
      isOpen={isOpen}
      closePopup={closePopup}
      hasCloseButton={props?.hasCloseButton}
    >
      {children}
    </Popup>
  );

  return { isOpen, openPopup, closePopup, togglePopup, renderPopup };
};

export default usePopup;
