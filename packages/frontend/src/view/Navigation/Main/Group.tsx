import React from 'react';

import { getKeyFromText } from '../../../utils/getKeyFromText';
import { Group as Props } from '../../../types';
import { H6 } from '../../../ui';
import { RoleProtectedComponent } from '../../RoleProtectedComponent';
import { Item } from './Item';
import { useStyles } from './useStyles';

export const Group: React.FC<Props> = ({ name, items }) => {
  const { group, groupName } = useStyles();
  return (
    <section className={group}>
      {!!name && <H6 className={groupName}>{name}</H6>}
      {items.map((item) => {
        return (
          <RoleProtectedComponent
            Component={Item}
            key={getKeyFromText(item.text)}
            {...item}
          />
        );
      })}
    </section>
  );
};
