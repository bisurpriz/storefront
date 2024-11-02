import React, { useEffect, useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HourSelect from "../HourSelect";
import clsx from "clsx";
import { localeFormat } from "@/utils/format";
import { TimeRange } from "../HourSelect/utils";
import { DeliveryTime } from "@/contexts/CartContext";
import RemainingTime from "./RemainingTime";
import DeliveryDateTimePicker from "../DeliveryDateTimePicker";

type Props = {
  deliveryTimes: TimeRange[] | null;
  onSelect: (deliveryTime: DeliveryTime) => void;
  deliveryTime: DeliveryTime;
  lastOrderTime: string;
};

const DaySelect: React.FC<Props> = ({
  deliveryTimes,
  onSelect,
  deliveryTime,
  lastOrderTime,
}) => {
  const isTodayDisabled = useMemo(() => {
    const today = new Date();
    const [hour, minute] = format(new Date(lastOrderTime), "HH:mm").split(":");
    return (
      today.getHours() >= parseInt(hour) &&
      today.getMinutes() >= parseInt(minute)
    );
  }, [lastOrderTime]);

  const remainTime = useMemo(() => {
    const [hour, minute] = format(new Date(lastOrderTime), "HH:mm").split(":");
    const today = new Date();
    const lastOrderDate = new Date();
    lastOrderDate.setHours(parseInt(hour));
    lastOrderDate.setMinutes(parseInt(minute));
    lastOrderDate.setSeconds(0);

    const diff = lastOrderDate.getTime() - today.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return { hours, minutes };
  }, [lastOrderTime]);

  return (
    <div className="w-full flex flex-col gap-4 font-sans">
      {lastOrderTime && remainTime.hours >= 0 && remainTime.minutes >= 0 && (
        <RemainingTime
          remainTime={remainTime}
          isTodayDisabled={isTodayDisabled}
        />
      )}
      <DeliveryDateTimePicker
        deliveryTime={deliveryTime}
        deliveryTimes={deliveryTimes}
        onSelect={onSelect}
      />
    </div>
  );
};

export default DaySelect;
