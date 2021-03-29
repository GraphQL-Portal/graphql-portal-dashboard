import { ReactNode } from 'react';
import { SwitchProps, SelectProps } from '@material-ui/core';
import {
  ErrorsAndControl,
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
  GeneralFormMethods,
} from '../HookForm';
import { ObjectArrayItem, StringArrayItem } from './data';

export type Switch = Omit<SwitchProps, 'onChange'> & {
  value: boolean;
  onChange(value: boolean): void;
};

type FieldArrayComponent<T> = {
  name: string;
  title: string;
  onAdd: FieldArrayAppend;
  onRemove: FieldArrayRemove;
  fields: FieldArray<T>;
};

export type ObjectArrayForm = FieldArrayComponent<ObjectArrayItem> & {
  keyLabel?: string;
  valueLabel?: string;
} & ErrorsAndControl;

export type StringArrayForm = FieldArrayComponent<StringArrayItem> & {
  valueLabel?: string;
} & Pick<GeneralFormMethods, 'register' | 'errors'>;

export type AddFieldArrayHeader = {
  title: string;
  onAddClick: FieldArrayAppend;
};

export type FormGroup = { title: string };

type Option = {
  value: string | number | undefined;
  label: ReactNode;
};

export type Select = SelectProps & {
  options: Option[];
  fullWidth?: boolean;
};
