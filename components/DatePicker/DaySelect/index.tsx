import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  addDays,
  addHours,
  differenceInHours,
  format,
  isAfter,
  isSameDay,
  setHours,
  setMinutes,
  startOfHour,
} from "date-fns";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import HourSelect from "../HourSelect";
import clsx from "clsx";
import { localeFormat } from "@/utils/format";
import { TimeRange } from "../HourSelect/utils";
import { DeliveryTime } from "@/contexts/DeliveryTimeContext";

const CustomButton = ({ isSelected, children, ...props }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      className={clsx(
        { "bg-secondary text-white ": isSelected },
        "max-sm:px-0 flex flex-col justify-center items-center",
        "rounded-md px-2 py-6 w-full max-md:p-2",
        "text-xl max-md:text-sm",
        "hover:bg-secondary hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent",
        "transition-all duration-200 ease-in-out"
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

type Props = {
  deliveryTimes: TimeRange[] | null;
  onSelect: (deliveryTime: DeliveryTime) => void;
};

const DaySelect: React.FC<Props> = ({ deliveryTimes, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [availableHours, setAvailableHours] = useState<TimeRange[] | null>(
    null
  );
  const [orderWithinHours, setOrderWithinHours] = useState<number | null>(null);

  const handleButtonClick = (daysToAdd: number) => {
    const date = addDays(new Date(), daysToAdd);
    setSelectedDate(date);
    setSelectedButton(daysToAdd);
    setSelectedHour(null);
  };

  const handleSelectHour = (hour: string) => {
    onSelect({
      day: selectedDate,
      hour,
    });
    setSelectedHour(hour);
  };

  const calculateTodayAvailableHours = () => {
    const today = new Date();
    const now = new Date();

    if (!isSameDay(selectedDate, today)) {
      return [...deliveryTimes];
    } else {
      const availableHours = [...deliveryTimes]?.reduce((acc, time) => {
        const [startHour, startMinute] = time.start_time.split(":").map(Number);
        const [endHour, endMinute] = time.end_time.split(":").map(Number);

        const startTime = setMinutes(setHours(today, startHour), startMinute);
        const endTime = setMinutes(setHours(today, endHour), endMinute);

        if (isAfter(endTime, now)) {
          if (isAfter(now, startTime)) {
            const adjustedTime = {
              ...time,
              start_time: format(startOfHour(now), "HH:mm"),
            };
            acc.push(adjustedTime);
          } else {
            const roundedStartTime = format(startOfHour(startTime), "HH:mm");
            const newTime = {
              ...time,
              start_time: roundedStartTime,
            };
            acc.push(newTime);
          }
        }

        return acc;
      }, []);

      // Combine times with the same start_time and end_time
      const combinedHours = availableHours.reduce((acc, time) => {
        const existing = acc.find(
          (t) =>
            t.start_time === time.start_time && t.end_time === time.end_time
        );

        if (!existing) {
          acc.push(time);
        } else {
          existing.end_time = time.end_time; // Update the end_time if necessary
        }

        return acc;
      }, []);

      return combinedHours;
    }
  };

  const checkOrderWithinHours = (hours: number) => {
    const today = new Date();
    const cutoffTime = addHours(today, hours);

    if (selectedDate && differenceInHours(cutoffTime, today) >= 0) {
      setOrderWithinHours(hours);
    } else {
      setOrderWithinHours(null);
    }
  };

  useEffect(() => {
    if (deliveryTimes) {
      const availableHours = calculateTodayAvailableHours();
      setAvailableHours(availableHours);
    }
    checkOrderWithinHours(1);
  }, [selectedDate]);

  return (
    <div className="w-full flex flex-col gap-4  font-sans">
      <div className={clsx("grid grid-cols-3 gap-2")}>
        {Array.from({ length: 3 }).map((_, index) => (
          <CustomButton
            key={index}
            isSelected={selectedButton === index}
            onClick={() => handleButtonClick(index)}
          >
            <span>
              {index === 0
                ? "Bugün"
                : index === 1
                ? "Yarın"
                : localeFormat(addDays(new Date(), index), "eeee")}
            </span>
          </CustomButton>
        ))}
        {selectedDate && (
          <motion.div
            key={selectedDate?.toString() || 0}
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            exit={{ x: 20 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              { "col-start-1 col-end-2": selectedButton === 0 },
              { "col-start-2 col-end-3": selectedButton === 1 },
              { "col-start-3 col-span-1": selectedButton === 2 }
            )}
          >
            <HourSelect
              deliveryTimeRanges={availableHours}
              onHourSelect={handleSelectHour}
            />
          </motion.div>
        )}
      </div>
      {selectedHour && (
        <span
          className={clsx(
            "text-xs text-gray-500",
            "p-2 rounded-lg bg-6 text-slate-500"
          )}
        >
          Ürününüz <strong>{localeFormat(selectedDate, "PPP")}</strong>{" "}
          tarihinde <strong>{selectedHour}</strong> saatleri arasında teslim
          edilecektir.
        </span>
      )}
      {orderWithinHours !== null && (
        <span
          className={clsx(
            "text-xs text-gray-500",
            "p-2 rounded-lg bg-6 text-slate-500"
          )}
        >
          <strong>{orderWithinHours} saat içinde</strong> sipariş verirseniz,
          bugün teslimat yapılabilir.
        </span>
      )}
    </div>
  );
};

export default DaySelect;
