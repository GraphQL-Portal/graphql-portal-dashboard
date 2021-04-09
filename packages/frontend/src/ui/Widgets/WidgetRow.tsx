import React from 'react';

import { Grid } from '../Grid';
import { useStyles } from './useStyles';

export const WidgetRow: React.FC = ({ children, ...props }) => {
  const { row } = useStyles();

  return (
    <section {...props} className={row}>
      <Grid>{children}</Grid>
    </section>
  );
};
