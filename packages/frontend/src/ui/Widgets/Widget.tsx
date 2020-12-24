import { Paper } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { Widget as Type } from './types';

export const Widget:React.FC<Type> = ({ children, className }) => {
  const { widget } = useStyles();
  const widgetClassName = clsx(widget, className);

  return <Paper className={widgetClassName}>{children}</Paper>;
}
