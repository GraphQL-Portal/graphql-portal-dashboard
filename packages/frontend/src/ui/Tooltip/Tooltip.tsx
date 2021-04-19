import React from 'react';
import { Tooltip as MuiTooltip } from '@material-ui/core';
import { Tooltip as Props } from '../../types';

import { useStyles } from './useStyles';

export const Tooltip: React.FC<Props> = (props) => {
  const { tooltip, arrow } = useStyles();
  return <MuiTooltip {...props} classes={{ tooltip, arrow }} arrow />;
};
