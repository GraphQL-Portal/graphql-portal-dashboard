import React from 'react';
import clsx from 'clsx';

import { Grid } from '../../../ui';
import { ClassName } from '../../../types';
import { useStyles } from './useStyles';

export const HandlerRow: React.FC<Partial<ClassName>> = ({
  children,
  className,
}) => {
  const { handlerRow } = useStyles();
  const rowClassName = clsx(handlerRow, className);
  return <Grid className={rowClassName}>{children}</Grid>;
};
