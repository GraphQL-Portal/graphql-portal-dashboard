import React from 'react';

import { TableCell } from './Cell';
import { useStyles } from './useStyles';

export const TableActionCell: React.FC = ({ children, ...props }) => {
  const { actionCell } = useStyles();
  return (
    <TableCell {...props} align="right" className={actionCell}>
      {children}
    </TableCell>
  );
};
