import React from 'react';

import { TableCell } from './Cell';
import { useStyles } from './useStyles';

export const TableIconCell: React.FC = ({ children }) => {
  const { iconCell, iconCellWrapper } = useStyles();
  return (
    <TableCell className={iconCell}>
      <div className={iconCellWrapper}>{children}</div>
    </TableCell>
  );
};
