import React from 'react';

import { Spinner } from '../../ui';
import { useStyles } from './useStyles';

export const Loading:React.FC = () => {
  const { container } = useStyles();
  return(
    <section className={container}>
      <Spinner />
    </section>
  );
}
