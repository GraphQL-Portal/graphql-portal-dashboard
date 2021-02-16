import { Control, FieldErrors, ArrayField } from 'react-hook-form';

export type ControlType = {
  control: Control;
};

export type Errors = {
  errors: FieldErrors;
};

export type ErrorsAndControl = ControlType & Errors;

export type FieldArray = Partial<ArrayField<Record<string, any>, 'id'>>[];
export type FieldArrayAppend = (value: Partial<Record<string, any>>) => void;
export type FieldArrayRemove = (index?: number | number[] | undefined) => void;
