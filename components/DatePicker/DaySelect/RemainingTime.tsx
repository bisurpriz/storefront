"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface RemainingTimeProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function RemainingTime({
  remainTime,
  isTodayDisabled,
}: {
  remainTime: RemainingTimeProps;
  isTodayDisabled?: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!remainTime || remainTime.hours < 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full p-2 bg-white rounded-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
      role="timer"
      aria-label="Kalan teslimat süresi"
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Icon ve Başlık */}
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-100 p-2.5 dark:bg-slate-800">
            <Clock className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </div>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-base">
            {!isTodayDisabled && "Bugün Teslimat için"}
          </h3>
        </div>

        {/* Sayaç */}
        <div className="flex items-center gap-2 animate-pulse">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Saat */}
            {remainTime.hours > 0 && (
              <TimeUnit value={remainTime.hours} unit="saat" />
            )}

            {/* Dakika */}
            <AnimatePresence mode="wait">
              {remainTime.minutes > 0 ? (
                <TimeUnit value={remainTime.minutes} unit="dakika" />
              ) : (
                <TimeUnit value={remainTime.seconds} unit="saniye" />
              )}
            </AnimatePresence>
          </motion.div>

          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            kaldı
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
  <motion.div
    key={`${value}-${unit}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="flex items-center gap-1"
  >
    <span className="font-mono text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-sm text-slate-600 dark:text-slate-400">{unit}</span>
  </motion.div>
);
