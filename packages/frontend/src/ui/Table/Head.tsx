import React from 'react';
import { TableHead as MuiTableHead, TableRow } from '@material-ui/core';

export const TableHead: React.FC = ({ children }) => {
  return (
    <MuiTableHead>
      <TableRow>{children}</TableRow>
    </MuiTableHead>
  );
};
