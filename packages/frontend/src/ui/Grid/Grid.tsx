import React from 'react';
import { Grid as MuiGrid } from '@material-ui/core';

import { Grid as Props } from '../../types';

export const Grid: React.FC<Props> = (props) => {
  return <MuiGrid container spacing={3} {...props} />;
};
