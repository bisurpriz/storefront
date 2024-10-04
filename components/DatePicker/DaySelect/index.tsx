import React, { useEffect, useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HourSelect from "../HourSelect";
import clsx from "clsx";
import { localeFormat } from "@/utils/format";
import { TimeRange } from "../HourSelect/utils";
import { DeliveryTime } from "@/contexts/CartContext";

const CustomButton = ({ isSelected, children, ...props }) => {
  return (
    <Button
      variant="default"
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
  deliveryTime: DeliveryTime;
  lastOrderTime: string;
};

const DaySelect: React.FC<Props> = ({
  deliveryTimes,
  onSelect,
  deliveryTime,
  lastOrderTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [availableHours, setAvailableHours] = useState<TimeRange[] | null>(
    null
  );

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
    const nowHour = today.getHours();

    if (selectedDate?.getDate() !== today.getDate()) {
      return deliveryTimes;
    } else {
      return [...deliveryTimes]?.filter((time) => {
        const [startHour, startMinute] = time.start_time.split(":");
        const [endHour, endMinute] = time.end_time.split(":");

        if (nowHour < parseInt(startHour)) return true;

        if (
          nowHour === parseInt(startHour) &&
          today.getMinutes() < parseInt(startMinute)
        )
          return true;

        if (nowHour < parseInt(endHour)) return true;

        return false;
      });
    }
  };

  useEffect(() => {
    if (deliveryTimes) {
      const availableHours = calculateTodayAvailableHours();
      setAvailableHours(availableHours);
    }
  }, [deliveryTimes, selectedDate]);

  useEffect(() => {
    if (Boolean(deliveryTime.day && deliveryTime.hour)) {
      setSelectedDate(new Date(deliveryTime.day));
      setSelectedHour(deliveryTime.hour);
      setSelectedButton(
        [0, 1, 2].findIndex(
          (index) =>
            localeFormat(addDays(new Date(), index), "PPP") ===
            localeFormat(new Date(deliveryTime.day), "PPP")
        )
      );
    }
  }, [deliveryTime]);

  const isTodayDisabled = useMemo(() => {
    const today = new Date();
    const [hour, minute] = format(new Date(lastOrderTime), "HH:mm").split(":");
    return (
      today.getHours() >= parseInt(hour) &&
      today.getMinutes() >= parseInt(minute)
    );
  }, [lastOrderTime]);

  const remainTime = useMemo(() => {
    const [hour, minute] = format(new Date(lastOrderTime), "HH:mm").split(":");
    const today = new Date();
    const lastOrderDate = new Date();
    lastOrderDate.setHours(parseInt(hour));
    lastOrderDate.setMinutes(parseInt(minute));
    lastOrderDate.setSeconds(0);

    const diff = lastOrderDate.getTime() - today.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return { hours, minutes };
  }, [lastOrderTime]);

  return (
    <div className="w-full flex flex-col gap-4  font-sans mb-2">
      {lastOrderTime && remainTime.hours >= 0 && remainTime.minutes >= 0 && (
        <span className="leading-5 text-slate-400 whitespace-nowrap cursor-pointer text-xs ml-1 mt-1">
          {!isTodayDisabled && `Bugün teslimat için son: `}{" "}
          <span className={clsx("p-2 rounded-lg bg-6 text-slate-500")}>
            {remainTime.hours} saat {remainTime.minutes} dakika.{" "}
          </span>
        </span>
      )}
      <div className={clsx("grid grid-cols-3 gap-2")}>
        {Array.from({ length: 3 }).map((_, index) => (
          <CustomButton
            disabled={index === 0 && isTodayDisabled && lastOrderTime}
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
            key={selectedDate.toString()}
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
              selectedHour={selectedHour}
            />
          </motion.div>
        )}
      </div>
      {selectedHour && (
        <span className={clsx("text-xs p-2 rounded-lg bg-6 text-slate-500")}>
          Ürününüz <strong>{localeFormat(selectedDate, "PPP")}</strong>{" "}
          tarihinde <strong>{selectedHour}</strong> saatleri arasında teslim
          edilecektir.
        </span>
      )}
    </div>
  );
};

export default DaySelect;
