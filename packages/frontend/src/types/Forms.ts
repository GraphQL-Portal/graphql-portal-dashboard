import {
  ErrorsAndControl,
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
} from './HookForm';
import { SwitchProps } from '@material-ui/core';

export type ObjectArray = {
  onAdd: FieldArrayAppend;
  onRemove: FieldArrayRemove;
  title: string;
  fields: FieldArray;
  name: string;
} & ErrorsAndControl;

export type FormGroup = {
  title: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type Switch = SwitchProps & {
  value: boolean;
  onChange(value: boolean): void;
};

export type StringArray = { value: string }[];
