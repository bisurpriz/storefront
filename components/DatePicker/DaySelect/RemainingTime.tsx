"use client";

import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RemainingTimeProps {
  hours: number;
  minutes: number;
}

export default function RemainingTime({
  remainTime,
  isTodayDisabled,
}: {
  remainTime: RemainingTimeProps;
  isTodayDisabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 py-1 px-2 rounded-lg shadow-sm bg-slate-100 text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <Clock className="w-4 h-4 text-slate-600" />
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-medium text-slate-600">
            {!isTodayDisabled && "Bugün teslimat için son:"}
          </span>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className={cn("text-sm font-semibold text-orange-500")}
          >
            <span className="tabular-nums">
              {remainTime.hours} saat {remainTime.minutes} dakika
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
