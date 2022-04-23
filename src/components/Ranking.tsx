import React, { useMemo } from 'react';

import { User } from 'src/entities/user';
import { getContributionsCount } from 'src/utils/user';

type Props = {
  users: User[];
  targetPeriod: number;
};
export const Ranking: React.FC<Props> = ({ users, targetPeriod }) => {
  const sortedUser = useMemo(() => {
    const _users = [...users];
    _users.sort(
      (userA, userB) =>
        getContributionsCount(userB, targetPeriod) -
        getContributionsCount(userA, targetPeriod),
    );
    return _users;
  }, [targetPeriod, users]);

  return (
    <ul className="py-8 px-4 bg-secondary-regular border-secondary-regular">
      {sortedUser.map((user, index) => {
        const _index = index + 1;
        return (
          <li key={user.id}>
            {`・${_index}位: ${user.id} (${getContributionsCount(
              user,
              targetPeriod,
            )}commits)`}
          </li>
        );
      })}
    </ul>
  );
};
