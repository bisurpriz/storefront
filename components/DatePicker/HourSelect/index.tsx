import { FC, useEffect, useRef, useState } from "react";
import { TimeRange } from "./utils";
import Button from "@/components/Button";
import clsx from "clsx";
import AnimatedFilterBox from "@/components/Filter/components/FilterInput/AnimatedFilterBox";

type HourSelectProps = {
  deliveryTimeRanges: TimeRange[] | null;
  onHourSelect: (hour: string) => void;
  selectedHour?: string;
};

const HourSelect: FC<HourSelectProps> = ({
  deliveryTimeRanges,
  onHourSelect,
  selectedHour,
}) => {
  const [showHourDropdown, setShowHourDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleHourSelect = (hour: string) => {
    if (selectedHour === hour) return;
    if (!deliveryTimeRanges.length) return;
    onHourSelect(hour);
    setShowHourDropdown(false);
    console.log("selected hour", hour);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowHourDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div ref={containerRef} className="w-full relative">
      <Button
        fullWidth
        color="secondary"
        variant="fullfilled"
        className="max-md:text-xs justify-center"
        onClick={() => setShowHourDropdown(true)}
        disabled={!deliveryTimeRanges?.length}
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
                  "bg-gray-100 text-primary":
                    selectedHour === `${time.start_time} - ${time.end_time}`,
                },
                "focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              )}
              aria-selected={
                selectedHour === `${time.start_time} - ${time.end_time}`
              }
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
