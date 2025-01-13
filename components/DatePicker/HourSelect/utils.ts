import { setHours, setMinutes, startOfDay } from "date-fns";

export interface TimeRange {
  start_time: string;
  end_time: string;
}

export const HOURS_BEFORE_DELIVERY_END = 2;

export const getMinMaxTimes = (
  timeRanges: TimeRange[],
): { minTimes: Date[]; maxTimes: Date[] } => {
  const minTimes: Date[] = [];
  const maxTimes: Date[] = [];

  timeRanges.forEach(({ start_time, end_time }) => {
    const [startHour, startMinute] = start_time.split(":").map(Number);
    const [endHour, endMinute] = end_time.split(":").map(Number);

    minTimes.push(
      setHours(setMinutes(startOfDay(new Date()), startMinute), startHour),
    );
    maxTimes.push(
      setHours(setMinutes(startOfDay(new Date()), endMinute), endHour),
    );
  });

  return { minTimes, maxTimes };
};

export const filterPassedTime = (
  time: Date,
  minTimes: Date[],
  maxTimes: Date[],
  currentDate: Date,
): boolean => {
  const selectedDate = new Date(time);

  if (isToday(currentDate)) {
    return minTimes.some((minTime, index) => {
      const maxTime = maxTimes[index];
      return (
        selectedDate >= minTime &&
        selectedDate <= maxTime &&
        currentDate < selectedDate
      );
    });
  }

  return minTimes.some((minTime, index) => {
    const maxTime = maxTimes[index];
    return selectedDate >= minTime && selectedDate <= maxTime;
  });
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
