import React from 'react';

import { getKeyFromText } from '../../../utils/getKeyFromText';
import { H6 } from '../../../ui';
import { Item } from './Item';
import { Group as Type } from './types';
import { useStyles } from './useStyles';

export const Group:React.FC<Type> = ({ name, items }) => {
  const { group, groupName } = useStyles();
  return (
    <section className={group}>
      {!!name && <H6 className={groupName}>{name}</H6>}
      {items.map((item) => <Item {...item} key={getKeyFromText(item.text)} />)}
    </section>
  );
}
