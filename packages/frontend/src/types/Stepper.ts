import { StepProps, StepLabelProps, StepperProps } from '@material-ui/core';

export type Step = {
  stepProps?: StepProps;
  labelProps?: StepLabelProps;
  label: string;
};

export type Stepper = {
  steps: Step[];
} & Omit<StepperProps, 'children'>;
