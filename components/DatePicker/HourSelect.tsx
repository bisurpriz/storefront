"use client";

import { useState } from "react";
import CollapsableDateButton from "./CollapsableButton/CollapsableDateButton";
import {
  add,
  isToday,
  isTomorrow,
  setHours,
  setMinutes,
  startOfTomorrow,
} from "date-fns";
import { localeFormat, parseJson } from "@/utils/format";
import DateSelect from "./DateSelect";

const date = new Date();
const monthFormat = "d MMMM";
const namingFormat = "EEEE";

const tomorrow = startOfTomorrow();
const dayAfterTomorrow = add(date, { days: 2 });

const todayDay = isToday(date);
const tomorrowDay = isTomorrow(tomorrow);

type Props = {
  className?: string;
  deliveryTimeRanges: string;
};

const HourSelect = ({ className = "", deliveryTimeRanges }: Props) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const handleSelect = (val: Date | null) => {
    setSelectedDay(val);
  };

  const parsedDeliveryTimeRanges = parseJson(deliveryTimeRanges);

  //   [
  //     {
  //         "start_time": "09:00",
  //         "end_time": "12:00"
  //     },
  //     {
  //         "start_time": "15:00",
  //         "end_time": "17:00"
  //     }
  //   ]

  const deliveryTimes = parsedDeliveryTimeRanges.map((range) => {
    const start = setHours(
      setMinutes(new Date(), 0),
      parseInt(range.start_time.split(":")[0])
    );
    const end = setHours(
      setMinutes(new Date(), 0),
      parseInt(range.end_time.split(":")[0])
    );

    const times: Date[] = [];

    for (let i = start; i < end; i = add(i, { hours: 1 })) {
      times.push(i);
    }

    return times;
  });

  const buttonDays = [
    {
      label: todayDay ? "Bugün" : localeFormat(date, namingFormat),
      value: date,
    },
    {
      label: tomorrowDay ? "Yarın" : localeFormat(tomorrow, namingFormat),
      value: tomorrow,
    },
    {
      label: localeFormat(dayAfterTomorrow, namingFormat),
      value: dayAfterTomorrow,
    },
  ];

  return (
    <div
      className={`grid grid-cols-4 gap-4 my-2 transition duration-300 w-full ease-in ${className}`}
    >
      {buttonDays.map(({ label, value }) => {
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
      <DateSelect
        handleSelect={handleSelect}
        selectedDay={selectedDay}
        deliveryTimes={deliveryTimes}
      />
    </div>
  );
};

export default HourSelect;
