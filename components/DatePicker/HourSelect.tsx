'use client';

import { useState } from 'react';
import CollapsableDateButton from './CollapsableButton/CollapsableDateButton';
import { add, isToday, isTomorrow, startOfTomorrow } from 'date-fns';
import { localeFormat } from '@/utils/format';
import DateSelect from './DateSelect';

const date = new Date();
const monthFormat = 'd MMMM';
const namingFormat = 'EEEE';

const tomorrow = startOfTomorrow();
const dayAfterTomorrow = add(date, { days: 2 });

const todayDay = isToday(date);
const tomorrowDay = isTomorrow(tomorrow);

const buttonDays = [
  {
    label: todayDay ? 'Bugün' : localeFormat(date, namingFormat),
    value: date,
    deliveryTimes: ['13:00', '14:00'],
  },
  {
    label: tomorrowDay ? 'Yarın' : localeFormat(tomorrow, namingFormat),
    value: tomorrow,
    deliveryTimes: ['10:00', '11:00', '14:00'],
  },
  {
    label: localeFormat(dayAfterTomorrow, namingFormat),
    value: dayAfterTomorrow,
    deliveryTimes: ['10:00', '11:00', '12:00'],
  },
];

type Props = {
  className?: string;
};

const HourSelect = ({ className = '' }: Props) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const handleSelect = (val: Date | null) => {
    setSelectedDay(val);
  };

  return (
    <div
      className={`grid grid-cols-4 gap-4 my-2 transition duration-300 w-full ease-in ${className}`}
    >
      {buttonDays.map(({ label, value, deliveryTimes }) => {
        return (
          <CollapsableDateButton
            key={label}
            monthFormat={monthFormat}
            label={label}
            selectedDay={selectedDay}
            value={value}
            deliveryTimes={deliveryTimes}
            onSelect={handleSelect}
          />
        );
      })}
      <DateSelect
        handleSelect={handleSelect}
        selectedDay={selectedDay}
        deliveryTimes={[
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
        ]}
      />
    </div>
  );
};

export default HourSelect;
