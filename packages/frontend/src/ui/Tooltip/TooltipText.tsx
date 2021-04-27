import React from 'react';

import { useStyles } from './useStyles';

export const TooltipText: React.FC = ({ children }) => {
  const { tooltipText } = useStyles();
  return <p className={tooltipText}>{children}</p>;
};
