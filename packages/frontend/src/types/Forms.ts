import {
  ErrorsAndControl,
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
} from './HookForm';

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
