import React from 'react';

import { H3 } from '../Typography';
import { useStyles } from './useStyles';

export const DialogTitle: React.FC = ({ children }) => {
  const { title } = useStyles();
  return <H3 className={title}>{children}</H3>;
};
