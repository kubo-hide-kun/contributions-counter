import { User } from 'src/entities/user';

import { getRecentlyCalender } from './calender';
import { sum } from './numbers';

export const getContributionsCount = (
  user: User,
  targetPeriod: number,
): number => {
  return sum(Object.values(getRecentlyCalender(user.calender, targetPeriod)));
};
