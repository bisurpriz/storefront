"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { PredictionsListProps } from "./types";

const dropdownVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
};

export const PredictionsList = ({
  predictions,
  isOpen,
  activeIndex,
  onSelect,
}: PredictionsListProps) => {
  return (
    <AnimatePresence>
      {isOpen && predictions.length > 0 && (
        <motion.ul
          id="predictions-list"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute z-10 mt-2 w-full space-y-1 rounded-md border bg-white p-2",
            "shadow-lg ring-1 ring-black/5",
            "scrollbar-thin scrollbar-track-transparent max-h-[300px] overflow-auto",
            "scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400",
          )}
        >
          {predictions.map((prediction: any, index: number) => (
            <motion.li
              key={prediction.place_id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.03,
                duration: 0.15,
              }}
              className={cn("cursor-pointer rounded-md transition-colors", {
                "bg-primary/10": activeIndex === index,
              })}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 px-3 py-2 text-left",
                  "hover:bg-primary/5 active:bg-primary/10",
                  "transition-colors duration-150",
                )}
                onClick={() => onSelect(prediction)}
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="line-clamp-1 font-medium">
                    {prediction.structured_formatting.main_text}
                  </span>
                  <span className="line-clamp-1 text-sm text-gray-500">
                    {prediction.structured_formatting.secondary_text}
                  </span>
                </div>
              </Button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
