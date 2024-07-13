import { FC, useEffect, useRef, useState } from "react";
import { TimeRange } from "./utils";
import Button from "@/components/Button";
import clsx from "clsx";
import AnimatedFilterBox from "@/components/Filter/components/FilterInput/AnimatedFilterBox";

type HourSelectProps = {
  deliveryTimeRanges: TimeRange[] | null;
  onHourSelect: (hour: string) => void;
};

const HourSelect: FC<HourSelectProps> = ({
  deliveryTimeRanges,
  onHourSelect,
}) => {
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [showHourDropdown, setShowHourDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleHourSelect = (date: string) => {
    setSelectedHour(date);
    onHourSelect(date);
    setShowHourDropdown(false);
  };

  return (
    <div ref={containerRef} className="w-full relative">
      <Button
        fullWidth
        color="secondary"
        variant="fullfilled"
        className="max-md:text-xs justify-center"
        onClick={() => setShowHourDropdown(!showHourDropdown)}
      >
        {selectedHour ?? "Saat Seç"}
      </Button>
      <AnimatedFilterBox
        isOpen={showHourDropdown}
        handleClose={() => setShowHourDropdown(false)}
        className="!w-full"
      >
        <div
          className={clsx(
            "flex items-center justify-between px-4 py-2 border-b border-gray-200"
          )}
        >
          <h4 id="hour-select">Saat Seç</h4>
        </div>
        <ul
          aria-hidden={!showHourDropdown}
          aria-labelledby="hour-select"
          aria-label="Saat Seç"
          role="listbox"
          tabIndex={0}
        >
          {deliveryTimeRanges?.map((time, index) => (
            <li
              className={clsx(
                "px-4 py-2 cursor-pointer hover:bg-gray-100",
                {
                  "bg-gray-100 text-primary": selectedHour?.startsWith(
                    time.start_time
                  ),
                },
                "focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              )}
              aria-selected={selectedHour === time.start_time}
              aria-label={`${time.start_time} - ${time.end_time}`}
              key={index}
              onClick={() =>
                handleHourSelect(`${time.start_time} - ${time.end_time}`)
              }
              role="option"
            >
              {time.start_time} - {time.end_time}
            </li>
          ))}
        </ul>
      </AnimatedFilterBox>
    </div>
  );
};

export default HourSelect;
