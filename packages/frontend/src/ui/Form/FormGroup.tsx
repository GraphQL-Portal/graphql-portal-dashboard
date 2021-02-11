import React from 'react';

import { FormGroup as Props } from '../../types';
import { useStyles } from './useStyles';

export const FormGroup: React.FC<Props> = ({ title, children }) => {
  const { block, legend } = useStyles();
  return (
    <fieldset className={block}>
      <legend className={legend}>{title}</legend>
      {children}
    </fieldset>
  );
};
