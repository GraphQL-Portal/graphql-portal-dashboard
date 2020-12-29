import React from 'react';

import { WidgetActions as Props } from '../types';
import { useStyles } from './useStyles';

export const WidgetActions:React.FC<Props> = ({ children, justify }) => {
  const { footer } = useStyles({ justify });
  return (<footer className={footer}>{children}</footer>);
}
