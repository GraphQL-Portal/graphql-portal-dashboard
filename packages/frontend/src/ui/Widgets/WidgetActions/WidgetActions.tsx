import React from 'react';

import { WidgetActions as Type } from '../types';
import { useStyles } from './useStyles';

export const WidgetActions:React.FC<Type> = ({ children, justify }) => {
  const { footer } = useStyles({ justify });
  return (<footer className={footer}>{children}</footer>);
}
