import { Paper } from '@material-ui/core';
import React from 'react';

import { useStyles } from './useStyles';
export const Widget:React.FC = ({ children }) => {
  const { widget } = useStyles();
  return <Paper className={widget}>{children}</Paper>;
}
