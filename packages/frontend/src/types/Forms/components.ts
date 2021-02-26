import { SwitchProps } from '@material-ui/core';
import {
  ErrorsAndControl,
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
} from '../HookForm';
import { ObjectArrayItem, StringArrayItem } from './data';

export type Switch = SwitchProps & {
  value: boolean;
  onChange(value: boolean): void;
};

type FieldArrayComponent<T> = {
  name: string;
  title: string;
  onAdd: FieldArrayAppend;
  onRemove: FieldArrayRemove;
  fields: FieldArray<T>;
} & ErrorsAndControl;

export type ObjectArrayForm = FieldArrayComponent<ObjectArrayItem>;

export type StringArrayForm = FieldArrayComponent<StringArrayItem>;

export type FormGroup = { title: string };
