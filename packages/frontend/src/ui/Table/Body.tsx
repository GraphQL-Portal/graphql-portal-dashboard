import React from 'react';
import { TableBody as MuiTableBody, TableBodyProps } from '@material-ui/core';

export const TableBody: React.FC<TableBodyProps> = (props) => {
  return <MuiTableBody {...props} />;
};
