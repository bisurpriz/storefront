import React, { forwardRef } from "react";
import Button from "../Button";
import { BsCalendar } from "react-icons/bs";
import ReactDatePicker from "react-datepicker";
import { add } from "date-fns";
import { localeFormat } from "@/utils/format";
import { tr } from "date-fns/locale";

type Props = {
  selectedDay: Date | null;
  handleSelect: (val: Date | null) => void;
  deliveryTimes: string[];
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
        <Button
          className="pt-4 pb-4 flex items-center justify-center h-fit"
          fullWidth
          variant={
            isSelectCalendar || selectedDay === null ? "fullfilled" : "outlined"
          }
          onClick={() => {
            handleSelect(null);
          }}
        >
          <span className="min-h-[48px] flex items-center justify-center flex-col">
            {!isSelectCalendar ? (
              <>
                <BsCalendar className="text-lg font-medium" />
                <p className="text-sm font-normal mt-1">Takvim</p>
              </>
            ) : (
              <p className="text-sm font-medium">
                {isSelectCalendar
                  ? localeFormat(isSelectCalendar, "d MMMM HH:mm")
                  : "Tarih seçiniz"}
              </p>
            )}
          </span>
        </Button>
      </div>
    );
  }
);

function DateSelect({ selectedDay, handleSelect, deliveryTimes }: Props) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        handleSelect(date);
      }}
      includeTimes={deliveryTimes.map((time) => {
        const [hour, minute] = time.split(":");
        return add(new Date(), {
          hours: Number(hour),
          minutes: Number(minute),
        });
      })}
      locale={tr}
      minDate={new Date(add(new Date(), { days: 3 }))}
      showTimeSelect
      timeIntervals={60}
      onCalendarOpen={() => handleSelect(null)}
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
