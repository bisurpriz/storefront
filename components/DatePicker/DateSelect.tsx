import React, { forwardRef } from "react";
import Button from "../Button";
import { BsCalendar } from "react-icons/bs";
import ReactDatePicker from "react-datepicker";
import CollapsableDateButton from "./CollapsableButton/CollapsableDateButton";
import { localeFormat } from "@/utils/format";
import { add } from "date-fns";

type Props = {
  selectedDay: Date | null;
  handleSelect: (val: Date | null) => void;
};

type CustomButtonProps = {
  isSelectCalendar: Date | null;
  handleSelect: (val: Date | null) => void;
  selectedDay: Date | null;
};

const CustomButton = forwardRef(
  (
    {
      isSelectCalendar,
      handleSelect,
      selectedDay,
      ...props
    }: CustomButtonProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div ref={isSelectCalendar ? ref : null} {...props}>
        {!isSelectCalendar ? (
          <Button
            className="pt-4 pb-4 flex items-center justify-center h-fit"
            fullWidth
            variant={isSelectCalendar ? "fullfilled" : "outlined"}
          >
            <span className="min-h-[48px] flex items-center justify-center flex-col">
              <BsCalendar className="text-lg font-medium" />
              <p className="text-sm font-normal mt-1">Takvim</p>
            </span>
          </Button>
        ) : (
          <CollapsableDateButton
            deliveryTimes={["13:00", "14:00"]}
            label={
              isSelectCalendar !== null
                ? localeFormat(isSelectCalendar, "EEEE")
                : ""
            }
            monthFormat="d MMMM"
            onSelect={handleSelect}
            selectedDay={selectedDay}
            value={selectedDay ?? isSelectCalendar}
          />
        )}
      </div>
    );
  }
);

function DateSelect({ selectedDay, handleSelect }: Props) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  return (
    <ReactDatePicker
      selected={new Date()}
      onChange={(date) => {
        setSelectedDate(date);
        handleSelect(null);
      }}
      minDate={new Date(add(new Date(), { days: 3 }))}
      onCalendarOpen={() => console.log("open")}
      customInput={
        <CustomButton
          isSelectCalendar={selectedDate}
          handleSelect={handleSelect}
          selectedDay={selectedDay}
        />
      }
    />
  );
}

export default DateSelect;
