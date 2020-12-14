import React from 'react';

import { getKeyFromText } from '../../../utils/getKeyFromText';
import { H6 } from '../../../ui';
import { Item } from './Item';
import { Group as Type } from './types';
import { useStyles } from './styles';

export const Group:React.FC<Type> = ({ name, items }) => {
  const { group, groupName } = useStyles();
  return (
    <section className={group}>
      {!!name && <H6 className={groupName}>{name}</H6>}
      {items.map(({ text, link }) => <Item text={text} link={link} key={getKeyFromText(text)} />)}
    </section>
  );
}
