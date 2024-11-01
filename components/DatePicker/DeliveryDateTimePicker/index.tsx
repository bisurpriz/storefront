"use client";

import { addDays, format, parse } from "date-fns";
import { tr } from "date-fns/locale";
import { Clock, ChevronDown } from "lucide-react";

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
import { DeliveryTime } from "@/contexts/CartContext";
import { localeFormat } from "@/utils/format";

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

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-2 flex-nowrap">
        {days.map((day) => (
          <Button
            key={day.label}
            variant={
              date.toDateString() === day.value.toDateString()
                ? "secondary"
                : "default"
            }
            className="flex-1 lg:py-4 lg:h-auto lg:text-lg text-white"
            onClick={() => {
              setDate(day.value);
              setSelectedTimeRange(null);
            }}
          >
            {day.label}
          </Button>
        ))}
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left font-normal border-2 border-primary"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {selectedTimeRange ? (
                formatTimeRange(selectedTimeRange)
              ) : (
                <span>Teslimat Saati Seç</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </SheetTrigger>
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

      <div
        className={cn(
          "rounded-lg border p-2 text-center text-sm flex flex-wrap justify-center gap-1 shadow-md",
          "bg-gradient-to-r from-primary/40 to-secondary/40 text-white"
        )}
      >
        Seçilen Tarih ve Saat Aralığı:{" "}
        <span className="font-semibold">
          {format(date, "d MMMM yyyy", { locale: tr })}
          {selectedTimeRange && ` - ${formatTimeRange(selectedTimeRange)}`}
        </span>
      </div>
    </div>
  );
}
