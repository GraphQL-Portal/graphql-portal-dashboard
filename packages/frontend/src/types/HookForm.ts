import { BaseSyntheticEvent } from 'react';
import { ArrayField, UseFormMethods } from 'react-hook-form';
import { RecordStringAny } from './General';

export type GeneralFormMethods = UseFormMethods<any>;

export type ControlType = Pick<GeneralFormMethods, 'control'>;
export type Errors = Pick<GeneralFormMethods, 'errors'>;

export type ErrorsAndControl = ControlType & Errors;

export type FieldArray<T = RecordStringAny> = Partial<ArrayField<T, 'id'>>[];
export type FieldArrayAppend = (value: RecordStringAny) => void;
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
export type OnSubmit = (
  e?: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

export type FormMethods<T> = UseFormMethods<T>;
