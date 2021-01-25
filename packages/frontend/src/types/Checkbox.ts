import { CheckboxProps } from '@material-ui/core';

export type Checkbox = CheckboxProps & {
  dataTest: string;
  value: boolean;
  onChange(value: boolean): void;
};
