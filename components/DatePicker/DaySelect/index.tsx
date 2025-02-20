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
    const today = new Date();
    const [hour, minute] = format(new Date(lastOrderTime), "HH:mm").split(":");
    return (
      today.getHours() >= parseInt(hour) &&
      today.getMinutes() >= parseInt(minute)
    );
  };


  const remainTime = () => {
    const [hour, minute] = format(new Date(lastOrderTime), "HH:mm").split(":");
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
  };

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
