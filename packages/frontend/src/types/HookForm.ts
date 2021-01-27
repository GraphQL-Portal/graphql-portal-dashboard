import { Control, FieldErrors } from 'react-hook-form';

export type ControlType = {
  control: Control;
};

export type Errors = {
  errors: FieldErrors;
};

export type ErrorsAndControl = ControlType & Errors;
