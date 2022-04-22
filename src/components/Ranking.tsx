import React from 'react';

import { User } from 'src/entities/user';
import { sum } from 'src/utils/array';
import { getRecentlyCalender } from 'src/utils/calender';

type Props = {
  users: User[];
  targetPeriod: number;
};
export const Ranking: React.FC<Props> = ({ users, targetPeriod }) => {
  return (
    <ul className="py-8 px-4 bg-secondary-regular border-secondary-regular">
      {users.map((user, index) => {
        const _index = index + 1;
        return (
          <li key={user.id}>
            {`・${_index}位: ${user.id} (${sum(
              Object.values(getRecentlyCalender(user.calender, targetPeriod)),
            )}commits)`}
          </li>
        );
      })}
    </ul>
  );
};
