import React from 'react';
import { NavLink } from 'react-router-dom';

import { TextButton } from '../../../ui';
import { GroupItem } from '../../../types';
import { useStyles } from './useStyles';
import { toSnakeCase } from '../../../utils';

export const Item: React.FC<GroupItem> = ({ link, text, Icon, external }) => {
  const { item, activeItem, button } = useStyles();

  const dataTourValue = `navigation-item-${toSnakeCase(text)}`;

  return !!external ? (
    <a
      href={link}
      className={item}
      rel="noopener noreferrer"
      data-tour={dataTourValue}
      target="_blank"
    >
      <TextButton fullWidth className={button} startIcon={<Icon />}>
        {text}
      </TextButton>
    </a>
  ) : (
    <NavLink
      to={link}
      className={item}
      data-tour={dataTourValue}
      activeClassName={activeItem}
    >
      <TextButton fullWidth className={button} startIcon={<Icon />}>
        {text}
      </TextButton>
    </NavLink>
  );
};
