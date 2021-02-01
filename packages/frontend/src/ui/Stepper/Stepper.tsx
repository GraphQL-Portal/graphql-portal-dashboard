import React from 'react';
import { Stepper as MuiStepper, Step, StepLabel } from '@material-ui/core';

import { getKeyFromText } from '../../utils';
import { Stepper as Props } from '../../types';
import { useStyles } from './useStyles';

export const Stepper: React.FC<Props> = ({ steps, ...stepper }) => {
  const { root, horizontal } = useStyles();
  return (
    <MuiStepper classes={{ root }} {...stepper}>
      {steps.map(({ label, stepProps, labelProps }) => (
        <Step
          key={getKeyFromText(label)}
          classes={{ horizontal }}
          {...stepProps}
        >
          <StepLabel {...labelProps}>{label}</StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};
