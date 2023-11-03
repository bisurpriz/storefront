"use client";

import React, { useState } from "react";
import Button from "../Button";
import CollapsableDateButton from "./CollapsableButton/CollapsableDateButton";
import { BsCalendar } from "react-icons/bs";
import { add, isToday, isTomorrow, startOfTomorrow } from "date-fns";
import { localeFormat } from "@/utils/format";

const date = new Date();
const monthFormat = "d MMMM";
const namingFormat = "EEEE";

const tomorrow = startOfTomorrow();
const dayAfterTomorrow = add(date, { days: 2 });

const todayDay = isToday(date);
const tomorrowDay = isTomorrow(tomorrow);

const buttonDays = [
  {
    label: todayDay ? "Bugün" : localeFormat(date, namingFormat),
    value: date,
    deliveryTimes: ["13:00", "14:00"],
  },
  {
    label: tomorrowDay ? "Yarın" : localeFormat(tomorrow, namingFormat),
    value: tomorrow,
    deliveryTimes: ["10:00", "11:00", "14:00"],
  },
  {
    label: localeFormat(dayAfterTomorrow, namingFormat),
    value: dayAfterTomorrow,
    deliveryTimes: ["10:00", "11:00", "12:00"],
  },
];

type Props = {
  className?: string;
};

const DayHourSelect = ({ className = "" }: Props) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const handleSelect = (val: Date | null) => {
    setSelectedDay(val);
  };

  return (
    <div
      className={`grid grid-cols-4 gap-4 my-2 transition-max-height duration-300 ease-in ${className}`}
    >
      {buttonDays.map(({ label, value, deliveryTimes }) => {
        return (
          <CollapsableDateButton
            key={label}
            monthFormat={monthFormat}
            label={label}
            selectedDay={selectedDay}
            value={value}
            deliveryTimes={deliveryTimes}
            onSelect={handleSelect}
          />
        );
      })}
      <Button
        className="pt-4 pb-4 flex items-center justify-center h-fit"
        fullWidth
        variant={selectedDay === null ? "fullfilled" : "outlined"}
        onClick={() => handleSelect(null)}
      >
        <span className="min-h-[48px] flex items-center justify-center flex-col">
          <BsCalendar className="text-lg font-medium" />
          <p className="text-sm font-normal">Takvim</p>
        </span>
      </Button>
    </div>
  );
};

export default DayHourSelect;
