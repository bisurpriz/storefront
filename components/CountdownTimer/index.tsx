"use client";

import React, { FC, useRef, useEffect, useState } from "react";

type CountdownTimerProps = {
  time: number;
  text?: (count: string) => string;
  isFormattedText?: boolean;
  className?: string;
};

const CountdownTimer: FC<CountdownTimerProps> = ({
  time,
  className,
  text,
  isFormattedText = true,
}) => {
  const [count, setCount] = useState(time);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (count === 0 || count < 0) {
        clearInterval(intervalRef.current);
        return;
      }
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const formattedCount = `${Math.floor(count / 60)}:${
    count % 60 < 10 ? `0${count % 60}` : count % 60
  }`;

  return (
    <div className={className}>
      {text
        ? isFormattedText
          ? text(formattedCount)
          : text(count.toString())
        : count}
    </div>
  );
};

export default CountdownTimer;
