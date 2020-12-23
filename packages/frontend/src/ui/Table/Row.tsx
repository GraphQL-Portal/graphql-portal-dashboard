import React from 'react';
import { TableRow as MuiTableRow, TableRowProps } from '@material-ui/core';

export const TableRow: React.FC<TableRowProps> = (props) => {
  return <MuiTableRow {...props} />;
};
