import clsx from "clsx";
import { motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { tr } from "date-fns/locale";
import { TimeRange, filterPassedTime, getMinMaxTimes } from "./utils";

type HourSelectProps = {
  deliveryTimeRanges: TimeRange[];
  onHourSelect: (hour: Date) => void;
  currentDate: Date | null;
};

const HourSelect: FC<HourSelectProps> = ({
  deliveryTimeRanges,
  onHourSelect,
  currentDate,
}) => {
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleHourSelect = (date: Date) => {
    setSelectedHour(date);
    onHourSelect(date);
  };

  const { minTimes, maxTimes } = getMinMaxTimes(deliveryTimeRanges);

  const filterTime = (time: Date): boolean => {
    return filterPassedTime(time, minTimes, maxTimes, currentDate);
  };

  return (
    <div ref={containerRef}>
      <ReactDatePicker
        selected={selectedHour}
        onChange={handleHourSelect}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Saat"
        locale={tr}
        minTime={minTimes[0]}
        maxTime={maxTimes[maxTimes.length - 1]}
        filterTime={filterTime}
        dateFormat={"HH:mm"}
        placeholderText="Saat Seç"
        timeFormat="p"
      />
    </div>
  );
};

export default HourSelect;
