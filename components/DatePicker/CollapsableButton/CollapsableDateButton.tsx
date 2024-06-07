"use client";

import Button from "@/components/Button";
import { localeFormat } from "@/utils/format";
import TimePicker from "../TimePicker";
import { useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  label: string;
  value: Date | null;
  selectedDay: Date | null;
  monthFormat: string;
  deliveryTimes: Date[];
  onSelect: (val: Date | null) => void;
};

const CollapsableDateButton = ({
  monthFormat,
  label,
  value,
  deliveryTimes,
  onSelect,
  selectedDay,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    value === selectedDay ? onSelect(null) : onSelect(value);
  };

  return (
    <div className="relative">
      <Button
        key={value?.toString()}
        className="!p-2 flex items-center justify-center flex-col h-fit"
        variant={value === selectedDay ? "fullfilled" : "outlined"}
        fullWidth
        onClick={handleOpen}
      >
        <p className="text-base font-medium truncate">{label}</p>
        <p className="text-sm font-normal">
          {value ? localeFormat(value, monthFormat) : ""}
        </p>
      </Button>
      <motion.div
        initial={false}
        animate={value === selectedDay ? "open" : "closed"}
        variants={{
          open: { maxHeight: 100, opacity: 1 },
          closed: { maxHeight: 0, opacity: 0 },
        }}
        className="overflow-hidden"
        ref={ref}
      >
        <div
          className="transition-max-height duration-300 ease-in w-full border mt-2 rounded-lg overflow-hidden"
          ref={ref}
        >
          {value ? (
            <TimePicker
              onChange={(date) => onSelect(date)}
              className="w-full h-full outline-none border-none bg-transparent text-center text-sm font-normal"
              // filterTime={(time) => deliveryTimes.includes(time)}
              includeTimes={deliveryTimes}
            />
          ) : (
            "Uygun teslimat zamanı bulunamadı"
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CollapsableDateButton;
