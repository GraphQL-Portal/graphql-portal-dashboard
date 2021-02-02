import React from 'react';
import { Stepper as MuiStepper, Step, StepButton } from '@material-ui/core';

import { getKeyFromText } from '../../utils';
import { NotLinearStepper as Props } from '../../types';
import { useStyles } from './useStyles';

export const NotLinearStepper: React.FC<Props> = ({
  steps,
  setStep,
  completed,
  ...stepper
}) => {
  const { root, horizontal } = useStyles();
  return (
    <MuiStepper classes={{ root }} {...stepper}>
      {steps.map(({ label, stepProps, buttonProps }, idx: number) => (
        <Step
          key={getKeyFromText(label)}
          classes={{ horizontal }}
          {...stepProps}
        >
          <StepButton
            {...buttonProps}
            onClick={setStep(idx)}
            completed={completed[idx]}
          >
            {label}
          </StepButton>
        </Step>
      ))}
    </MuiStepper>
  );
};
