import { AnimatedFilterBox } from "@/components/ui/animated-filter-box";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { TimeRange } from "./utils";

type HourSelectProps = {
  deliveryTimeRanges: TimeRange[] | null;
  onHourSelect: (hour: string) => void;
  selectedHour?: string;
  disabled?: boolean;
};

const HourSelect: FC<HourSelectProps> = ({
  deliveryTimeRanges,
  onHourSelect,
  selectedHour,
  disabled,
}) => {
  const [showHourDropdown, setShowHourDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleHourSelect = (hour: string) => {
    if (disabled) return;
    if (selectedHour === hour) return;
    if (!deliveryTimeRanges.length) return;
    onHourSelect(hour);
    setShowHourDropdown(false);
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
    <div ref={containerRef} className="relative w-full">
      <Button
        variant="outline"
        className="w-full justify-center max-md:text-xs"
        onClick={() => {
          if (disabled) return;
          setShowHourDropdown(true);
        }}
        disabled={!deliveryTimeRanges?.length || disabled}
      >
        {selectedHour ?? "Saat Seç"}
      </Button>
      <AnimatedFilterBox
        isOpen={showHourDropdown}
        handleClose={() => {
          setShowHourDropdown(false);
        }}
        className="!w-full"
      >
        <div
          className={clsx(
            "flex items-center justify-between border-b border-gray-200 px-4 py-2",
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
                "cursor-pointer px-4 py-2 hover:bg-gray-100",
                {
                  "bg-gray-100 text-primary":
                    selectedHour === `${time.start_time} - ${time.end_time}`,
                },
                "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-secondary",
              )}
              aria-selected={
                selectedHour === `${time.start_time} - ${time.end_time}`
              }
              aria-label={`${time.start_time} - ${time.end_time}`}
              key={index}
              onClick={() => {
                if (disabled) return;
                handleHourSelect(`${time.start_time} - ${time.end_time}`);
              }}
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
