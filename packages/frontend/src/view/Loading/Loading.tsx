import React from 'react';

import { Spinner } from '../../ui';
import { useStyles } from './useStyles';
import { Loading as LoadingProps } from '../../types';

export const Loading: React.FC<LoadingProps> = ({ size = 40 }) => {
  const { container } = useStyles();
  const spinnerSize = `${size}px`;

  return (
    <section className={container}>
      <Spinner
        style={{
          height: spinnerSize,
          width: spinnerSize,
        }}
      />
    </section>
  );
};
