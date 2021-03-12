import React from 'react';

import { getKeyFromText } from '../../../utils/getKeyFromText';
import { NavigationGroup as Props } from '../../../types';
import { H6 } from '../../../ui';
import { useNavigationGroup } from '../../../presenter/Navigation';
import { RoleProtectedComponent } from '../../RoleProtectedComponent';
import { Item } from './Item';
import { useStyles } from './useStyles';

export const Group: React.FC<Props> = ({ name, items }) => {
  const { group, groupName } = useStyles();
  const { navItems, withoutItems } = useNavigationGroup(items);

  if (withoutItems) return null;

  return (
    <section className={group}>
      {!!name && <H6 className={groupName}>{name}</H6>}
      {navItems.map(item => {
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
