import React from 'react';
import { Grid, GridProps } from '@material-ui/core';

export const Col: React.FC<GridProps> = (props) => {
  return <Grid item {...props} />;
};
