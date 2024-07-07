import { FC, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { tr } from "date-fns/locale";
import { TimeRange, filterPassedTime, getMinMaxTimes } from "./utils";
import Button from "@/components/Button";

type HourSelectProps = {
  deliveryTimeRanges: TimeRange[] | null;
  onHourSelect: (hour: Date) => string;
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
    <div ref={containerRef} className="w-full relative">
      <ReactDatePicker
        wrapperClassName="w-full"
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
        customInput={
          <Button
            fullWidth
            color="secondary"
            variant="fullfilled"
            className="max-md:text-xs justify-center"
          >
            {selectedHour ? onHourSelect(selectedHour) : "Saat Seç"}
          </Button>
        }
      />
    </div>
  );
};

export default HourSelect;
