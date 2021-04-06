import React from 'react';
import { TableCell } from '../../../ui';

import { useStyles } from './useStyles';

export const LogCell: React.FC = ({ children }) => {
  const { tableCell } = useStyles();
  return <TableCell className={tableCell}>{children}</TableCell>;
};
