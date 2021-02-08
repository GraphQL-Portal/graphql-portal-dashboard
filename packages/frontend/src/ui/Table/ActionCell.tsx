import React from 'react';

import { TableCell } from './Cell';
import { useStyles } from './useStyles';

export const TableActionCell: React.FC = ({ children }) => {
  const { actionCell } = useStyles();
  return (
    <TableCell align="right" className={actionCell}>
      {children}
    </TableCell>
  );
};
