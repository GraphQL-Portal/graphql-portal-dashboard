import React from 'react';
import { Grid } from '@material-ui/core';

import { Col as Props } from '../../types';

export const Col: React.FC<Props> = (props) => {
  return <Grid item {...props} />;
};
