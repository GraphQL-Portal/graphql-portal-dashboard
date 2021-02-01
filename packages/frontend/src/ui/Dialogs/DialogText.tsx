import React from 'react';

import { Body1 } from '../Typography';
import { useStyles } from './useStyles';

export const DialogText: React.FC = ({ children }) => {
  const { text } = useStyles();
  return <Body1 className={text}>{children}</Body1>;
};
