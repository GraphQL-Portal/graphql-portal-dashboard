import React from 'react';
import { useStyles } from './useStyles';

export const TooltipUL: React.FC = ({ children }) => {
  const { tooltipList } = useStyles();
  return <ul className={tooltipList}>{children}</ul>;
};
