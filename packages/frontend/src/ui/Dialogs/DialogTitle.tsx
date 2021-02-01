import React from 'react';

import { H4 } from '../Typography';
import { useStyles } from './useStyles';

export const DialogTitle: React.FC = ({ children }) => {
  const { title } = useStyles();
  return <H4 className={title}>{children}</H4>;
};
