import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@material-ui/core';

import { useStyles } from './useStyles';

export const Tooltip:React.FC<TooltipProps> = (props) => {
  const { tooltip, arrow } = useStyles();
  return (
    <MuiTooltip {...props} classes={{ tooltip, arrow }} arrow />
  );
}
