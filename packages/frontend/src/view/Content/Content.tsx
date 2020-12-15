import React from 'react';

import { useStyles } from './useStyles';

export const Content:React.FC = ({ children }) => {
  const { main } = useStyles();
  return <main className={main}>{children}</main>;
}
