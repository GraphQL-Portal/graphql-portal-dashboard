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
export type SetValue = (
  name: string,
  value: unknown,
  config?:
    | Partial<{
        shouldValidate: boolean;
        shouldDirty: boolean;
      }>
    | undefined
) => void;

export type Watch = (name: string, defaultValue?: any) => any;
