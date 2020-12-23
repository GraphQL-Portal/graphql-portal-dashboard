import React from 'react';
import { TableHead as MuiTableHead, TableRow } from '@material-ui/core';

import { useStyles } from './useStyles';

export const TableHead:React.FC = ({ children }) => {
  const { header } = useStyles();
  return (
    <MuiTableHead>
      <TableRow className={header}>
        {children}
      </TableRow>
    </MuiTableHead>
  );
}
