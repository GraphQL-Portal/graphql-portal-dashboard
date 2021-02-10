import React from 'react';

import { GROUPS } from './constants';
import { Group } from './Group';

export const Nav: React.FC = () => {
  return (
    <>
      {GROUPS.map((group) => (
        <Group {...group} key={group.name || 'main'} />
      ))}
    </>
  );
};
