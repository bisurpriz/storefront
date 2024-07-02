import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import HourSelect from "../HourSelect";
import clsx from "clsx";
import { localeFormat } from "@/utils/format";
import { TimeRange } from "../HourSelect/utils";

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
  onSelect: (date: Date) => void;
};

const DaySelect: React.FC<Props> = ({ deliveryTimes, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (daysToAdd: number) => {
    const date = addDays(new Date(), daysToAdd);
    setSelectedDate(date);
    setSelectedButton(daysToAdd);
  };

  const handleSelectHour = (hour: Date) => {
    const text = `${hour.getHours()}:00 - ${hour.getHours() + 1}:00`;
    const date = selectedDate.setHours(hour.getHours(), 0, 0, 0);
    onSelect(new Date(date));
    return text;
  };

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
              deliveryTimeRanges={deliveryTimes}
              currentDate={selectedDate}
              onHourSelect={handleSelectHour}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DaySelect;
