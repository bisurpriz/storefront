import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import HourSelect from "../HourSelect";
import clsx from "clsx";
import { localeFormat } from "@/utils/format";

const CustomButton = ({ isSelected, selectedHour, children, ...props }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      className={clsx(
        { "bg-secondary text-white": isSelected },
        "max-sm:px-0 flex flex-col justify-center items-center"
      )}
      {...props}
    >
      {children}
      {selectedHour && isSelected && (
        <span className="text-xs">{selectedHour}</span>
      )}
    </Button>
  );
};

const DaySelect: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const [selectedHour, setSelectedHour] = useState<string>(null);

  const handleButtonClick = (daysToAdd: number) => {
    setSelectedHour(null);
    const date = addDays(new Date(), daysToAdd);
    setSelectedDate(date);
    setSelectedButton(daysToAdd);
  };

  const handleSelectHour = (hour: Date) => {
    const text = `${hour.getHours()}:00 - ${hour.getHours() + 1}:00`;
    setSelectedHour(text);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className={clsx("grid grid-cols-3 gap-2")}>
        {Array.from({ length: 3 }).map((_, index) => (
          <CustomButton
            key={index}
            isSelected={selectedButton === index}
            onClick={() => handleButtonClick(index)}
            selectedHour={selectedHour}
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
      </div>

      <AnimatePresence>
        {selectedDate && (
          <motion.div
            key={selectedDate?.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HourSelect
              deliveryTimeRanges={[
                {
                  start_time: "09:00",
                  end_time: "12:00",
                },
                {
                  start_time: "19:00",
                  end_time: "23:00",
                },
              ]}
              currentDate={selectedDate}
              onHourSelect={handleSelectHour}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DaySelect;
