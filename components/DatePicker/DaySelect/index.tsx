import { DeliveryTime } from "@/contexts/CartContext/types";
import { format } from "date-fns";
import React from "react";
import DeliveryDateTimePicker from "../DeliveryDateTimePicker";
import { TimeRange } from "../HourSelect/utils";
import RemainingTime from "./RemainingTime";

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
  const isTodayDisabled = () => {
    if (!lastOrderTime) {
      return false;
    }

    try {
      const today = new Date();
      const parsedDate = new Date(lastOrderTime);

      if (isNaN(parsedDate.getTime())) {
        return false;
      }

      const [hour, minute] = format(parsedDate, "HH:mm").split(":");
      return (
        today.getHours() >= parseInt(hour) &&
        today.getMinutes() >= parseInt(minute)
      );
    } catch (error) {
      console.error("Error processing lastOrderTime:", error);
      return false;
    }
  };

  const remainTime = () => {
    if (!lastOrderTime) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    try {
      const parsedDate = new Date(lastOrderTime);

      if (isNaN(parsedDate.getTime())) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const [hour, minute] = format(parsedDate, "HH:mm").split(":");
      const today = new Date();
      const lastOrderDate = new Date();
      lastOrderDate.setHours(parseInt(hour));
      lastOrderDate.setMinutes(parseInt(minute));
      lastOrderDate.setSeconds(0);

      const diff = lastOrderDate.getTime() - today.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return { hours, minutes, seconds };
    } catch (error) {
      console.error("Error calculating remaining time:", error);
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  };

  if (deliveryTimes?.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4 font-sans">
      {lastOrderTime &&
        remainTime().hours >= 0 &&
        remainTime().minutes >= 0 && (
          <RemainingTime
            remainTime={remainTime()}
            isTodayDisabled={isTodayDisabled()}
          />
        )}
      <DeliveryDateTimePicker
        deliveryTime={deliveryTime}
        deliveryTimes={deliveryTimes}
        onSelect={onSelect}
        isTodayDisabled={isTodayDisabled()}
      />
    </div>
  );
};

export default DaySelect;
