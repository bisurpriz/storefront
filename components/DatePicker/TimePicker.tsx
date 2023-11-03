"use client";

import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import tr from "date-fns/locale/tr";

export interface TimePickerProps extends ReactDatePickerProps {
  className?: string;
}

const TimePicker = ({ className = "", ...rest }: TimePickerProps) => {
  const [startDate, setStartDate] = React.useState<Date | null>(null);

  const inputClasses = `px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`;

  return (
    <ReactDatePicker
      {...rest}
      locale={tr}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      placeholderText="Lütfen saat seçiniz"
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption="Lütfen saat seçiniz"
      timeFormat="HH:mm"
      dateFormat="HH:mm"
      className={inputClasses}
    />
  );
};

export default TimePicker;
