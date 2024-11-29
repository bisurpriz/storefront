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
      className="rounded-lg bg-primary p-4 text-center text-lg font-semibold text-white"
      text={(count) =>
        `Özelleştirmeleri tamamlamak için ${count} dakikanız kaldı`
      }
    />
  ) : (
    <div className="mb-8 animate-pulse rounded-lg bg-slate-500 p-4 text-center text-lg font-semibold text-white">
      <p className="mb-8 text-center font-semibold" />
    </div>
  );
};

export default CustomizePageCoutdown;
