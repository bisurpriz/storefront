"use client";

import React, { FC } from "react";
import CountdownTimer from "@/components/CountdownTimer";

type CustomizePageCoutdownProps = {
  countdown?: number;
};
const CustomizePageCoutdown: FC<CustomizePageCoutdownProps> = ({
  countdown,
}) => {
  return countdown ? (
    <CountdownTimer
      time={countdown}
      className="bg-primary text-white p-4 rounded-lg text-center text-lg font-semibold"
      text={(count) =>
        `Özelleştirmeleri tamamlamak için ${count} dakikanız kaldı`
      }
    />
  ) : (
    <div className="animate-pulse bg-slate-500 text-white p-4 rounded-lg text-center text-lg font-semibold mb-8">
      <p className="text-center font-semibold mb-8" />
    </div>
  );
};

export default CustomizePageCoutdown;
