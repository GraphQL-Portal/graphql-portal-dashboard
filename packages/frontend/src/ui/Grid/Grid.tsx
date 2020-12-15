import React from 'react';
import { Grid as MuiGrid, GridProps } from '@material-ui/core';

export const Grid:React.FC<GridProps> = (props) => {
  return <MuiGrid container spacing={3} {...props} />;
}
