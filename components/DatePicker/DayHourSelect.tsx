"use client";

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import tr from "dayjs/locale/tr";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isToday from "dayjs/plugin/isToday";
import Button from "../Button";
import CollapsableDateButton from "./CollapsableButton/CollapsableDateButton";
import { BsCalendar } from "react-icons/bs";

dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.locale(tr);

const date = dayjs();
const format = "D MMMM";
const namingFormat = "dddd";

const tomorrow = date.add(1, "day");
const dayAfterTomorrow = date.add(2, "day");

const todayDay = date.isToday();
const tomorrowDay = tomorrow.isTomorrow();

const buttonDays = [
  {
    label: todayDay ? "Bugün" : date.format(namingFormat),
    value: date,
    deliveryTimes: ["13:00", "14:00"],
  },
  {
    label: tomorrowDay ? "Yarın" : tomorrow.format(namingFormat),
    value: tomorrow,
    deliveryTimes: ["10:00", "11:00", "14:00"],
  },
  {
    label: dayAfterTomorrow.format(namingFormat),
    value: dayAfterTomorrow,
    deliveryTimes: ["10:00", "11:00", "12:00"],
  },
];

type Props = {
  className?: string;
};

const DayHourSelect = ({ className = "" }: Props) => {
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs | null>(date);

  const handleSelect = (val: dayjs.Dayjs | null) => {
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
            format={format}
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
