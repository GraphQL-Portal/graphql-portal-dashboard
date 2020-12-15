import React from 'react';
import { Grid, GridProps } from '@material-ui/core';

export const Row: React.FC<GridProps> = (props) => {
  return <Grid item container xs={12} {...props} />;
};
