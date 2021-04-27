import React from 'react';

import { FormLabel as Props } from '../../types';
import { FormLabel } from './FormLabel';
import { useStyles } from './useStyles';

export const FormLabelStart: React.FC<Props> = (props) => {
  const { startLabel, startLabelPlacement } = useStyles();
  return (
    <FormLabel
      {...props}
      classes={{ label: startLabel, labelPlacementStart: startLabelPlacement }}
      labelPlacement="start"
    />
  );
};
