import { CheckboxProps } from '@material-ui/core';

export type Checkbox = CheckboxProps & {
  value: boolean;
  onChange(value: boolean): void;
};
