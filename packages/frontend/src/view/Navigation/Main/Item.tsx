import React from 'react';
import { NavLink } from 'react-router-dom';

import { TextButton } from '../../../ui';
import { GroupItem } from './types';
import { useStyles } from './styles';

export const Item:React.FC<GroupItem> = ({ link, text }) => {
  const { item, activeItem, button } = useStyles();
  return (<NavLink to={link} className={item} activeClassName={activeItem}><TextButton fullWidth className={button}>{text}</TextButton></NavLink>);
}
