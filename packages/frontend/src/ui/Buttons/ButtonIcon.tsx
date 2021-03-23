import React from 'react';

import { useStyles } from './useStyles';

export const ButtonIcon: React.FC = ({ children }) => {
  const { buttonIcon } = useStyles();
  return <div className={buttonIcon}>{children}</div>;
};
