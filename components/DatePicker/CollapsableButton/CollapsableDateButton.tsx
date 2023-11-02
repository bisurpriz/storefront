import Button from "@/components/Button";
import dayjs from "dayjs";
import React from "react";
import { CSSTransition } from "react-transition-group";

type Props = {
  label: string;
  value: dayjs.Dayjs;
  selectedDay: dayjs.Dayjs | null;
  format: string;
  deliveryTimes: string[];
  onSelect: (val: dayjs.Dayjs | null) => void;
};

const CollapsableDateButton = ({
  format,
  label,
  value,
  deliveryTimes,
  onSelect,
  selectedDay,
}: Props) => {
  const ref = React.useRef<HTMLSelectElement>(null);

  const handleOpen = () => {
    value === selectedDay ? onSelect(null) : onSelect(value);
  };

  return (
    <div className="relative">
      <Button
        key={value.toString()}
        className="pt-4 pb-4 flex items-center justify-center flex-col h-fit"
        variant={value === selectedDay ? "fullfilled" : "outlined"}
        fullWidth
        onClick={handleOpen}
      >
        <p className="text-lg font-medium">{label}</p>
        <p className="text-sm font-normal">{value.format(format)}</p>
      </Button>
      <CSSTransition
        in={value === selectedDay}
        timeout={0}
        classNames={{
          enter: "max-h-0",
          enterActive: "max-h-[100px]",
          enterDone: "max-h-[100px]",
          exit: "max-h-[100px]",
          exitActive: "max-h-0",
          exitDone: "max-h-0",
        }}
        unmountOnExit
        nodeRef={ref}
      >
        <div className="transition-max-height duration-300 ease-in w-full border mt-2 rounded-lg">
          <select
            className="w-full h-full outline-none border-none bg-transparent text-center text-sm font-normal"
            name={label}
            id={label}
            onChange={(e) => {}}
            ref={ref}
          >
            <option value="">Saat Seçiniz</option>
            {deliveryTimes.map((time) => {
              return (
                <option key={time} value={time}>
                  {time}
                </option>
              );
            })}
          </select>
        </div>
      </CSSTransition>
    </div>
  );
};

export default CollapsableDateButton;
