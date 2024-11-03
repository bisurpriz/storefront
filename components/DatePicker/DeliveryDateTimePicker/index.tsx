"use client";

import { addDays, format, parse } from "date-fns";
import { tr } from "date-fns/locale";
import { Clock, ChevronDown } from "lucide-react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { TimeRange } from "../HourSelect/utils";
import { localeFormat } from "@/utils/format";
import { DeliveryTime } from "@/contexts/CartContext/types";

type DeliveryDateTimePickerProps = {
  deliveryTimes: TimeRange[] | null;
  deliveryTime: DeliveryTime;
  onSelect: (deliveryTime: DeliveryTime) => void;
};

export default function DeliveryDateTimePicker({
  deliveryTime,
  deliveryTimes,
  onSelect,
}: DeliveryDateTimePickerProps) {
  const [date, setDate] = useState<Date>(
    new Date(deliveryTime.day) || new Date()
  );
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(
    deliveryTime.hour || null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const days = [
    { label: "Bugün", value: new Date() },
    { label: "Yarın", value: addDays(new Date(), 1) },
    { value: addDays(new Date(), 2) },
  ].map((day) => ({
    ...day,
    label: day.label || localeFormat(day.value, "EEEE"),
  }));

  useEffect(() => {
    if (deliveryTime.day && deliveryTime.hour) {
      setDate(new Date(deliveryTime.day));
      setSelectedTimeRange(deliveryTime.hour);
    } else {
      setDate(new Date());
      setSelectedTimeRange(null);
    }
  }, [deliveryTime]);

  const availableDeliveryTimes = deliveryTimes
    ?.toSorted(
      (a, b) =>
        Number(a.start_time.split(":")[0]) - Number(b.start_time.split(":")[0])
    )
    .map((timeRange) => `${timeRange.start_time} - ${timeRange.end_time}`);

  const formatTimeRange = (range: string) => {
    const [start, end] = range.split(" - ");
    return `${format(parse(start, "HH:mm", new Date()), "HH:mm", {
      locale: tr,
    })} - ${format(parse(end, "HH:mm", new Date()), "HH:mm", { locale: tr })}`;
  };

  useEffect(() => {
    if (days && date)
      setSelectedButtonIndex(
        days.findIndex(
          (day) => date.toDateString() === day.value.toDateString()
        )
      );
  }, [date]);

  return (
    <div className="w-full space-y-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="grid grid-cols-3 gap-2">
          {days.map((day, index) => (
            <Button
              key={day.label}
              variant={
                date.toDateString() === day.value.toDateString()
                  ? "default"
                  : "soft"
              }
              className="col-span-1 lg:py-4 lg:h-auto lg:text-lg"
              onClick={() => {
                setDate(day.value);
                setSelectedTimeRange(null);
                setSelectedButtonIndex(index);
              }}
            >
              {day.label}
            </Button>
          ))}
          <motion.div
            key={selectedButtonIndex}
            className={cn(
              "col-span-1",
              {
                "col-start-1 col-end-2": selectedButtonIndex === 0,
              },
              {
                "col-start-2 col-end-3": selectedButtonIndex === 1,
              },
              {
                "col-start-3 col-end-4": selectedButtonIndex === 2,
              }
            )}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{
              duration: 0.2,
              type: "tween",
              ease: "easeInOut",
              delay: 0.05,
            }}
          >
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between text-left font-normal border-2 border-primary"
                )}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                icon={<Clock className="h-4 w-4" />}
              >
                {selectedTimeRange ? (
                  formatTimeRange(selectedTimeRange)
                ) : (
                  <span>Saat</span>
                )}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </SheetTrigger>
          </motion.div>
        </div>

        <SheetContent side="bottom" className="max-h-[50vh] sm:h-auto">
          <SheetHeader>
            <SheetTitle>Teslimat Saati Seçin</SheetTitle>
          </SheetHeader>
          <div className="mt-4 grid gap-2 overflow-y-auto">
            {availableDeliveryTimes.map((timeRange) => (
              <Button
                key={timeRange}
                variant="outline"
                className={cn(
                  "justify-start text-left",
                  selectedTimeRange === timeRange &&
                    "bg-primary text-primary-foreground"
                )}
                onClick={() => {
                  setSelectedTimeRange(timeRange);
                  onSelect({
                    day: date,
                    hour: timeRange,
                  });
                  setIsOpen(false);
                }}
              >
                {formatTimeRange(timeRange)}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {date && selectedTimeRange && (
        <div
          className={cn(
            "rounded-lg border p-2 text-start text-sm flex flex-wrap justify-start gap-1 shadow-sm",
            "bg-gradient-to-bl from-primary/20 to-accent text-slate-600"
          )}
        >
          Seçilen Tarih ve Saat Aralığı:{" "}
          <span className="font-semibold">
            {format(date, "d MMMM yyyy", { locale: tr })}
            {selectedTimeRange && ` - ${formatTimeRange(selectedTimeRange)}`}
          </span>
        </div>
      )}
    </div>
  );
}
