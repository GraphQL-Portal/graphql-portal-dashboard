import React from 'react';
import { Table as MuiTable, TableProps } from '@material-ui/core';

export const Table:React.FC<TableProps> = (props) => {
  return <MuiTable {...props} />;
};
