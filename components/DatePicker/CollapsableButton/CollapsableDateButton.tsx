"use client";

import Button from "@/components/Button";
import { CSSTransition } from "react-transition-group";
import { localeFormat } from "@/utils/format";
import TimePicker from "../TimePicker";
import { useRef } from "react";

type Props = {
  label: string;
  value: Date | null;
  selectedDay: Date | null;
  monthFormat: string;
  deliveryTimes: string[];
  onSelect: (val: Date | null) => void;
};

const CollapsableDateButton = ({
  monthFormat,
  label,
  value,
  deliveryTimes,
  onSelect,
  selectedDay,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    value === selectedDay ? onSelect(null) : onSelect(value);
  };

  return (
    <div className='relative'>
      <Button
        key={value?.toString()}
        className='!p-2 flex items-center justify-center flex-col h-fit'
        variant={value === selectedDay ? "fullfilled" : "outlined"}
        fullWidth
        onClick={handleOpen}
      >
        <p className='text-lg font-medium'>{label}</p>
        <p className='text-sm font-normal'>
          {value ? localeFormat(value, monthFormat) : ""}
        </p>
      </Button>
      <CSSTransition
        in={value === selectedDay}
        timeout={0}
        classNames={{
          enter: "max-h-0 opacity-0",
          enterActive: "max-h-[100px] opacity-100",
          enterDone: "max-h-[100px] opacity-100",
          exit: "max-h-[100px] opacity-100",
          exitActive: "max-h-0 opacity-0",
          exitDone: "max-h-0 opacity-0",
        }}
        unmountOnExit
        nodeRef={ref}
      >
        <div
          className='transition-max-height duration-300 ease-in w-full border mt-2 rounded-lg overflow-hidden'
          ref={ref}
        >
          {value ? (
            <TimePicker
              // 12:00 - 13:00 - 14:00 - 15:00 to date
              includeTimes={deliveryTimes.map((time) => {
                const [hour, minute] = time.split(":");
                return new Date(value.setHours(Number(hour), Number(minute)));
              })}
              onChange={(date) => onSelect(date)}
              className='w-full h-full outline-none border-none bg-transparent text-center text-sm font-normal'
            />
          ) : (
            "Uygun teslimat zamanı bulunamadı"
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default CollapsableDateButton;
