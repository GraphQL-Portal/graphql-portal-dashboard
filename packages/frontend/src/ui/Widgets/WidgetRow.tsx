import React from 'react';

import { Grid } from '../Grid';
import { useStyles } from './useStyles';

export const WidgetRow:React.FC = ({ children }) => {
  const { row } = useStyles();

  return <section className={row}><Grid>{children}</Grid></section>;
}
