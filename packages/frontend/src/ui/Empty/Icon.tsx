import React from 'react';
import { ErrorOutline } from '../../icons';

import { useStyles } from './useStyles';

export const EmptyIcon: React.FC = () => {
  const { icon, svg } = useStyles();
  return (
    <div className={icon}>
      <ErrorOutline className={svg} />
    </div>
  );
};
