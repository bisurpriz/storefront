"use client";

import { usePreventScroll } from "@/hooks/usePreventScroll";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useCallback } from "react";
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
  variant = "dropdown",
}: PredictionsListProps) => {
  const handleSelect = useCallback(
    (prediction: any, e: React.MouseEvent) => {
      // Event'i hemen durdur
      e.preventDefault();
      e.stopPropagation();

      // setTimeout kullanarak event queue'yu temizle
      setTimeout(() => {
        onSelect(prediction);
      }, 0);
    },
    [onSelect],
  );

  // Desktop'ta ve liste açıkken scroll'u engelle
  usePreventScroll(variant === "dropdown" && isOpen && predictions.length > 0);

  if (!isOpen || predictions.length === 0) return null;

  const PredictionItem = ({ prediction, index }: any) => (
    <button
      type="button"
      onClick={(e) => handleSelect(prediction, e)}
      className={cn(
        "w-full cursor-pointer text-left transition-all",
        variant === "dropdown"
          ? "p-2 hover:bg-gray-50"
          : "border-b border-gray-100 p-4 hover:bg-gray-50",
        {
          "bg-primary/10": activeIndex === index,
        },
      )}
    >
      <div className="flex items-start gap-3">
        <MapPin
          className={cn(
            "mt-1 h-5 w-5 shrink-0",
            activeIndex === index ? "text-primary" : "text-gray-400",
          )}
        />
        <div className="flex flex-1 flex-col">
          <span className="line-clamp-1 font-medium">
            {prediction.structured_formatting.main_text}
          </span>
          <span className="line-clamp-2 text-sm text-gray-500">
            {prediction.structured_formatting.secondary_text}
          </span>
        </div>
      </div>
    </button>
  );

  if (variant === "sheet") {
    return (
      <div className="space-y-1">
        {predictions.map((prediction: any, index: number) => (
          <PredictionItem
            key={prediction.place_id}
            prediction={prediction}
            index={index}
          />
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={dropdownVariants}
        transition={{ duration: 0.15 }}
        className={cn(
          "mt-2 overflow-hidden rounded-lg border bg-white shadow-lg",
          "max-h-[300px] overflow-y-auto overscroll-contain",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {predictions.map((prediction: any, index: number) => (
          <PredictionItem
            key={prediction.place_id}
            prediction={prediction}
            index={index}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
