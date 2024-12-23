"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Item = {
  text?: string;
  icon?: string;
};

export default function AnimatedPricing({
  items,
  timeout = 3000,
}: {
  items: Item[];
  timeout?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, timeout);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-6 w-full items-center gap-2 overflow-hidden rounded-lg bg-gray-100">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          exit={{ y: -24 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full"
        >
          <div className="flex w-full items-center gap-2 p-1 text-xs">
            <span>{items[currentIndex].icon}</span>
            <span>{items[currentIndex].text}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
