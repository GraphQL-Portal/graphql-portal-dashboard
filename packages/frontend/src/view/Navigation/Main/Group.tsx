import React from 'react';

import { getKeyFromText } from '../../../utils/getKeyFromText';
import { H6 } from '../../../ui';
import { Item } from './Item';
import { Group as Props, GroupItem } from './types';
import { useStyles } from './useStyles';
import { RoleProtectedComponent } from '../../';

export const Group: React.FC<Props> = ({ name, items }) => {
  const { group, groupName } = useStyles();
  return (
    <section className={group}>
      {!!name && <H6 className={groupName}>{name}</H6>}
      {items.map((item) => {
        const ProtectedItem = RoleProtectedComponent<GroupItem>(item.roles, Item);
        return <ProtectedItem {...item} key={getKeyFromText(item.text)} />
      })}
    </section>
  );
}
