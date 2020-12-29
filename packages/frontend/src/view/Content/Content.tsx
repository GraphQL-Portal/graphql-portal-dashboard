import React from 'react';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { Content as Props } from './types';

export const Content:React.FC<Props> = ({ children, className }) => {
  const { main } = useStyles();
  const mainClassName = clsx(main, className);

  return <main className={mainClassName}>{children}</main>;
}
