import React from 'react';
import { NavLink } from 'react-router-dom';

import { TextButton } from '../../../ui';
import { GroupItem } from '../../../types';
import { useStyles } from './useStyles';

export const Item: React.FC<GroupItem> = ({ link, text, Icon, external }) => {
  const { item, activeItem, button } = useStyles();

  const dataIntoValue = `navigation-item-${text
    .toLowerCase()
    .replace(/ /g, '-')}`;

  return !!external ? (
    <a
      href={link}
      className={item}
      rel="noopener noreferrer"
      data-intro={dataIntoValue}
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
      data-intro={dataIntoValue}
      activeClassName={activeItem}
    >
      <TextButton fullWidth className={button} startIcon={<Icon />}>
        {text}
      </TextButton>
    </NavLink>
  );
};
