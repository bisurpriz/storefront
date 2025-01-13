"use client";

import { addDays, format, isBefore, parse } from "date-fns";
import { tr } from "date-fns/locale";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DeliveryTime } from "@/contexts/CartContext/types";
import useResponsive from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { HOURS_BEFORE_DELIVERY_END, TimeRange } from "../HourSelect/utils";

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
    new Date(deliveryTime.day) || new Date(),
  );
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(
    deliveryTime.hour || null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const { isTablet } = useResponsive();

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
        Number(a.start_time.split(":")[0]) - Number(b.start_time.split(":")[0]),
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
          (day) => date.toDateString() === day.value.toDateString(),
        ),
      );
  }, [date]);

  const isTimeRangeDisabled = (timeRange: string) => {
    const now = new Date();
    const today = new Date().toDateString();
    const selectedDay = date.toDateString();

    if (today !== selectedDay) return false;

    const [_, end] = timeRange.split(" - ");
    const timeRangeEnd = parse(end, "HH:mm", new Date());
    const lastSelectableTime = new Date(timeRangeEnd);
    lastSelectableTime.setHours(
      timeRangeEnd.getHours() - HOURS_BEFORE_DELIVERY_END,
    );

    return isBefore(lastSelectableTime, now);
  };

  const TimeSelector = () => {
    if (isTablet) {
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between border-2 border-primary text-left font-normal",
                "min-h-[40px] px-3 py-2 text-sm",
              )}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <span className="line-clamp-1 flex-1">
                {selectedTimeRange
                  ? formatTimeRange(selectedTimeRange)
                  : "Teslimat Saati Tercihiniz"}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" className="max-h-[50vh] sm:h-auto">
            <SheetHeader>
              <SheetTitle>Teslimat Saati Planlaması</SheetTitle>
            </SheetHeader>
            <div className="mt-4 grid gap-2 overflow-y-auto px-1">
              {availableDeliveryTimes?.map((timeRange) => {
                const isDisabled = isTimeRangeDisabled(timeRange);
                const isSelected = selectedTimeRange === timeRange;
                return (
                  <Button
                    key={timeRange}
                    variant="outline"
                    disabled={isDisabled}
                    className={cn(
                      "relative flex min-h-[56px] items-center justify-start gap-2 px-3 text-left",
                      "transition-all duration-200",
                      isSelected && [
                        "border-primary bg-primary/5 text-primary",
                        "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:content-['']",
                      ],
                      !isDisabled &&
                        !isSelected && [
                          "hover:border-primary/50 hover:bg-primary/5",
                          "active:scale-[0.98]",
                        ],
                      isDisabled && [
                        "cursor-not-allowed opacity-50",
                        "border-dashed border-muted-foreground/50 bg-muted/50",
                      ],
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
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span
                        className={cn(
                          "line-clamp-1 font-medium",
                          isSelected && "text-primary",
                          isDisabled && "text-muted-foreground/50",
                        )}
                      >
                        {formatTimeRange(timeRange)}
                      </span>
                      <span
                        className={cn(
                          "line-clamp-1 text-xs text-muted-foreground",
                          isDisabled && "text-muted-foreground/50",
                        )}
                      >
                        {isDisabled
                          ? "Teslimat süresi tamamlanmıştır"
                          : "Teslimat için uygun zaman dilimi"}
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between border-2 border-primary text-left font-normal",
              "min-h-[40px] px-3 py-2",
            )}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="line-clamp-1 flex-1">
              {selectedTimeRange
                ? formatTimeRange(selectedTimeRange)
                : "Teslimat Saati Tercihiniz"}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "w-[var(--radix-dropdown-menu-trigger-width)] p-2",
            "max-h-[300px] overflow-y-auto",
          )}
        >
          {availableDeliveryTimes?.map((timeRange) => {
            const isDisabled = isTimeRangeDisabled(timeRange);
            const isSelected = selectedTimeRange === timeRange;
            return (
              <DropdownMenuItem
                key={timeRange}
                disabled={isDisabled}
                className={cn(
                  "relative flex min-h-[56px] cursor-pointer items-center justify-start gap-2 rounded-md px-3",
                  "transition-all duration-200",
                  isSelected && [
                    "bg-primary/5 text-primary",
                    "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-md before:bg-primary before:content-['']",
                  ],
                  !isDisabled &&
                    !isSelected && [
                      "hover:bg-primary/5 hover:text-primary",
                      "data-[highlighted]:bg-primary/5 data-[highlighted]:text-primary",
                    ],
                  isDisabled && [
                    "cursor-not-allowed opacity-50",
                    "bg-muted/50",
                  ],
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
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span
                    className={cn(
                      "line-clamp-1 font-medium",
                      isSelected && "text-primary",
                      isDisabled && "text-muted-foreground/50",
                    )}
                  >
                    {formatTimeRange(timeRange)}
                  </span>
                  <span
                    className={cn(
                      "line-clamp-1 text-xs text-muted-foreground",
                      isDisabled && "text-muted-foreground/50",
                    )}
                  >
                    {isDisabled
                      ? "Teslimat süresi tamamlanmıştır"
                      : "Teslimat için uygun zaman dilimi"}
                  </span>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="w-full space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {days.map((day, index) => (
          <Button
            key={day.label}
            variant={
              date.toDateString() === day.value.toDateString()
                ? "default"
                : "soft"
            }
            className="col-span-1 min-h-[40px] px-2 text-sm lg:h-auto lg:py-4 lg:text-lg"
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
            },
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
          <TimeSelector />
        </motion.div>
      </div>

      {date && selectedTimeRange && (
        <div
          className={cn(
            "rounded-lg border p-2 text-start font-manrope text-sm shadow-sm",
            "bg-gradient-to-bl from-primary/20 to-accent text-slate-600",
          )}
        >
          Sayın müşterimiz, siparişiniz{" "}
          <strong className="whitespace-nowrap">
            {format(date, "d MMMM yyyy", { locale: tr })}
          </strong>{" "}
          tarihinde{" "}
          <strong className="whitespace-nowrap">
            {selectedTimeRange && formatTimeRange(selectedTimeRange)}
          </strong>{" "}
          saatleri arasında tarafınıza teslim edilecektir.
        </div>
      )}
    </div>
  );
}
