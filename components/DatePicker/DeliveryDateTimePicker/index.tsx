"use client";

import { addDays, format, isBefore, isToday, parse } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { getSpecialDayStyle, isSpecialDay } from "./utils";

type DeliveryDateTimePickerProps = {
  deliveryTimes: TimeRange[] | null;
  deliveryTime: DeliveryTime;
  onSelect: (deliveryTime: DeliveryTime) => void;
  isTodayDisabled?: boolean;
};

export default function DeliveryDateTimePicker({
  deliveryTime,
  deliveryTimes,
  onSelect,
  isTodayDisabled,
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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const tomorrow = addDays(new Date(), 1);
  const twoWeeksFromTomorrow = addDays(tomorrow, 14);

  const days = [
    { label: "Bugün", value: new Date() },
    { label: "Yarın", value: addDays(new Date(), 1) },
    { label: "Takvim", value: null },
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
          (day) => date.toDateString() === day.value?.toDateString(),
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

          <SheetContent side="bottom" className="sm:h-auto">
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
            const isDisabled =
              isTimeRangeDisabled(timeRange) ||
              (isTodayDisabled && isToday(date));
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

  const getCalendarButtonText = () => {
    if (selectedButtonIndex === -1) {
      const specialDay = isSpecialDay(date);
      if (specialDay?.type === "gift") {
        return (
          <span className="flex items-center gap-1">
            {specialDay.buttonStyle?.icon}
            <span>{format(date, "d MMMM", { locale: tr })}</span>
          </span>
        );
      }
      return format(date, "d MMMM", { locale: tr });
    }
    return "Takvim";
  };

  const CalendarContent = () => (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(newDate) => {
        if (newDate) {
          setDate(newDate);
          setSelectedTimeRange(null);
          setSelectedButtonIndex(-1);
          setIsCalendarOpen(false);
        }
      }}
      disabled={(date) => {
        return isBefore(date, tomorrow) || date > twoWeeksFromTomorrow || false;
      }}
      modifiers={{
        special: (date) => isSpecialDay(date) !== undefined,
        gift: (date) => isSpecialDay(date)?.type === "gift",
      }}
      modifiersStyles={{
        special: {
          fontWeight: "bold",
          border: "2px solid var(--primary)",
          backgroundColor: "var(--primary-light)",
        },
        gift: {
          border: "2px solid #ec4899",
          background: "linear-gradient(to right, #fce7f3, #fdf2f8)",
          color: "#be185d",
          fontWeight: "bold",
        },
      }}
      components={{
        DayContent: (props) => {
          const specialDay = isSpecialDay(props.date);
          return (
            <div className="relative h-full w-full">
              <div className="flex items-center justify-center gap-0.5">
                {specialDay?.type === "gift" && (
                  <span className="text-[10px]">
                    {specialDay.buttonStyle?.icon}
                  </span>
                )}
                <span>{format(props.date, "d")}</span>
              </div>
              {specialDay && (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 truncate px-0.5 text-[8px] leading-tight",
                    specialDay.type === "gift"
                      ? "bg-pink-100 text-pink-700"
                      : "bg-primary/10 text-primary-foreground",
                  )}
                  title={`${specialDay.title}${
                    specialDay.description ? ` - ${specialDay.description}` : ""
                  }`}
                >
                  {specialDay.title}
                </div>
              )}
            </div>
          );
        },
      }}
      initialFocus
      className="w-full"
    />
  );

  return (
    <div className="w-full space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {days.map((day, index) => {
          if (index === 2) {
            return isTablet ? (
              <Sheet
                key="calendar-sheet"
                open={isCalendarOpen}
                onOpenChange={setIsCalendarOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant={selectedButtonIndex === -1 ? "default" : "soft"}
                    className={cn(
                      "col-span-1 min-h-[40px] px-2 text-sm lg:h-auto lg:py-4 lg:text-lg",
                      selectedButtonIndex === -1 && {
                        ...getSpecialDayStyle(isSpecialDay(date)),
                      },
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {getCalendarButtonText()}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="h-[80vh] p-0 sm:max-w-none"
                >
                  <SheetHeader className="p-6 pb-2">
                    <SheetTitle>Teslimat Tarihi Seçin</SheetTitle>
                  </SheetHeader>
                  <div className="flex h-full flex-col overflow-y-auto px-6 pb-6">
                    <CalendarContent />
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Popover
                key="calendar-popover"
                open={isCalendarOpen}
                onOpenChange={setIsCalendarOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant={selectedButtonIndex === -1 ? "default" : "soft"}
                    className={cn(
                      "col-span-1 min-h-[40px] px-2 text-sm lg:h-auto lg:py-4 lg:text-lg",
                      selectedButtonIndex === -1 && {
                        ...getSpecialDayStyle(isSpecialDay(date)),
                      },
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {getCalendarButtonText()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarContent />
                </PopoverContent>
              </Popover>
            );
          }

          return (
            <Button
              key={day.label}
              variant={
                date.toDateString() === day.value?.toDateString()
                  ? "default"
                  : "soft"
              }
              className="col-span-1 min-h-[40px] px-2 text-sm lg:h-auto lg:py-4 lg:text-lg"
              onClick={() => {
                if (day.value) {
                  setDate(day.value);
                  setSelectedTimeRange(null);
                  setSelectedButtonIndex(index);
                }
              }}
            >
              {day.label}
            </Button>
          );
        })}
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
              "col-start-3 col-end-4":
                selectedButtonIndex === -1 || selectedButtonIndex === 2,
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
            {
              "bg-gradient-to-bl from-primary/20 to-accent text-slate-600":
                !isSpecialDay(date)?.type,
              "border-pink-200 bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700":
                isSpecialDay(date)?.type === "gift",
            },
          )}
        >
          {isSpecialDay(date)?.type === "gift" && (
            <span className="mr-2 text-lg">
              {isSpecialDay(date)?.buttonStyle?.icon}
            </span>
          )}
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
