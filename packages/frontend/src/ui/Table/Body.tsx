import React from 'react';
import { TableBody as MuiTableBody, TableBodyProps } from '@material-ui/core';

import { useStyles } from './useStyles';

export const TableBody:React.FC<TableBodyProps> = (props) => {
  const { body } = useStyles();
  return <MuiTableBody {...props} className={body} />;
};
