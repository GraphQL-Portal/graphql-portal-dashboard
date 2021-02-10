import React from 'react';
import { TableCell as MuiTableCell, TableCellProps } from '@material-ui/core';

export const TableCell: React.FC<TableCellProps> = (props) => {
  return <MuiTableCell {...props} />;
};
