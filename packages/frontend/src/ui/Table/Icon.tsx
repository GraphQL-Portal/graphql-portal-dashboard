import React from 'react';

import { useStyles } from './useStyles';

export const TableIcon: React.FC = ({ children }) => {
  const { icon } = useStyles();
  return <div className={icon}>{children}</div>;
};
