import { SwitchProps } from '@material-ui/core';

export type Switch = SwitchProps & {
  value: boolean;
  onChange(value: boolean): void;
};
