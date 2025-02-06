"use client";

import { Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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
  if (!remainTime || remainTime.hours < 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-50 via-orange-50/70 to-slate-50 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-orange-100/50"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3.5"
      >
        <div className="rounded-lg bg-gradient-to-br from-orange-100 to-orange-200/70 p-2 shadow-sm">
          <Clock className="h-4 w-4 text-orange-600" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <motion.span 
            className="text-sm font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {!isTodayDisabled && "Bugün teslimat için kalan sipariş süresi:"}
          </motion.span>
          <div className="rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-2.5 py-1 shadow-sm">
            <span className="text-sm font-semibold tabular-nums text-white">
              {remainTime.hours > 0 && (
                <motion.span
                  key={remainTime.hours}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {remainTime.hours} saat{" "}
                </motion.span>
              )}
              <AnimatePresence mode="wait">
                {remainTime.minutes > 0 ? (
                  <motion.span
                    key={remainTime.minutes}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {remainTime.minutes} dakika
                  </motion.span>
                ) : (
                  <motion.span
                    key={remainTime.seconds}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {remainTime.seconds} saniye
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
