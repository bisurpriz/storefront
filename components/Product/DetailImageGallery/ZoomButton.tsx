import Search from "@/components/Icons/Search";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FC } from "react";

type ZoomButtonProps = {
  onClick: () => void;
};

const ZoomButton: FC<ZoomButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={clsx(
        "absolute bottom-2 right-2 z-10",
        "flex items-center justify-center",
        "w-12 h-12",
        "bg-slate-50 bg-opacity-30 rounded-full shadow-lg"
      )}
    >
      <Search className="w-6 h-6 stroke-[2px]" />
    </motion.button>
  );
};

export default ZoomButton;
