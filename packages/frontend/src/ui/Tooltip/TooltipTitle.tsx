import React from 'react';
import { H6 } from '../Typography';

import { useStyles } from './useStyles';

export const TooltipTitle: React.FC = ({ children }) => {
  const { tooltipTitle } = useStyles();
  return <H6 className={tooltipTitle}>{children}</H6>;
};
