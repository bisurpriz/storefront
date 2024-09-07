"use client";

import React, { FC, useRef, useEffect, useState, useMemo } from "react";

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
        sessionStorage.removeItem("countdown");
        clearInterval(intervalRef.current);
        return;
      }
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const formattedCount = useMemo(() => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }, [count]);

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
