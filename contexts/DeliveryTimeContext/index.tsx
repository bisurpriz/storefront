"use client";

import { isDate } from "date-fns";
import { ReactNode, createContext, useContext, useState } from "react";

export type DeliveryTime = {
  day: Date | null;
  hour: string;
};

interface DeliveryTimeContextType {
  deliveryTime: DeliveryTime | null;
  setDeliveryTimeHandler: (deliveryTime: DeliveryTime) => void;
  clearDeliveryTime: () => void;
}

export const DeliveryTimeContext = createContext<DeliveryTimeContextType>({
  deliveryTime: null,
  setDeliveryTimeHandler: () => {},
  clearDeliveryTime: () => {},
});

export const DeliveryTimeProvider = ({ children }: { children: ReactNode }) => {
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>({
    day: null,
    hour: "",
  });

  const isValidDeliveryTime = (deliveryTime: DeliveryTime) => {
    try {
      const { day, hour } = deliveryTime;
      if (isDate(day) && hour.length) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const setDeliveryTimeHandler = (deliveryTime: DeliveryTime) => {
    if (isValidDeliveryTime(deliveryTime)) {
      setDeliveryTime(deliveryTime);
    }
  };

  const clearDeliveryTime = () => {
    setDeliveryTime({ day: null, hour: "" });
  }

  return (
    <DeliveryTimeContext.Provider
      value={{
        deliveryTime,
        setDeliveryTimeHandler,
        clearDeliveryTime,
      }}
    >
      {children}
    </DeliveryTimeContext.Provider>
  );
};

export const useDeliveryTime = () => useContext(DeliveryTimeContext);
