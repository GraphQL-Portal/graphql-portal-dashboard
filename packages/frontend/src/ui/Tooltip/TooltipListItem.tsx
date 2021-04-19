import React from 'react';
import { useStyles } from './useStyles';

export const TooltipListItem: React.FC = ({ children }) => {
  const { tooltipListItem } = useStyles();
  return <li className={tooltipListItem}>{children}</li>;
};
