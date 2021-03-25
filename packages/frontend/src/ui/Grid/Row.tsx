import React from 'react';
import { Grid } from '@material-ui/core';

import { Row as Props } from '../../types';

export const Row: React.FC<Props> = (props) => {
  return <Grid item container xs={12} {...props} />;
};
