import {
  StepProps,
  StepLabelProps,
  StepperProps,
  ButtonBaseProps,
} from '@material-ui/core';

export type Step = {
  stepProps?: StepProps;
  labelProps?: StepLabelProps;
  buttonProps?: ButtonBaseProps;
  label: string;
};

export type Stepper = {
  steps: Step[];
} & Omit<StepperProps, 'children'>;

export type NotLinearStepper = Stepper & {
  setStep(idx: number): () => void;
  completed: boolean[];
};
