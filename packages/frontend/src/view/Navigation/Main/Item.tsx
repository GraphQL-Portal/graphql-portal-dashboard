import React from 'react';
import { NavLink } from 'react-router-dom';

import { TextButton } from '../../../ui';
import { GroupItem } from './types';
import { useStyles } from './useStyles';

export const Item: React.FC<GroupItem> = ({ link, text, Icon }) => {
  const { item, activeItem, button } = useStyles();

  return (
    <NavLink to={link} className={item} activeClassName={activeItem}>
      <TextButton fullWidth className={button} startIcon={<Icon />}>
        {text}
      </TextButton>
    </NavLink>
  );
};
