import { Calender } from 'src/entities/calender';

import { differenceDate } from './datetime';

export const getRecentlyCalender = <T>(
  calender: Calender<T>,
  period: number,
): Calender<T> => {
  return Object.fromEntries(
    Object.entries(calender).filter(
      ([day]) => (differenceDate({ fromDateString: day }) || 0) < period,
    ),
  );
};
