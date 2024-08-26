import React, { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import HourSelect from "../HourSelect";
import clsx from "clsx";
import { localeFormat } from "@/utils/format";
import { TimeRange } from "../HourSelect/utils";
import { DeliveryTime } from "@/contexts/CartContext";

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
  deliveryTime: DeliveryTime;
};

const DaySelect: React.FC<Props> = ({
  deliveryTimes,
  onSelect,
  deliveryTime,
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

  return (
    <div className="w-full flex flex-col gap-4  font-sans mb-2">
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
    </div>
  );
};

export default DaySelect;
