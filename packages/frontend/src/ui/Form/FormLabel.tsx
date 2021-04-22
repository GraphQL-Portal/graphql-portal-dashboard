import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { FormLabel as Props } from '../../types';

export const FormLabel: React.FC<Props> = (props) => {
  return <FormControlLabel {...props} />;
};
