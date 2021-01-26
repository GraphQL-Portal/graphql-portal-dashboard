import { ErrorsAndControl } from './HookForm';

export type FormCaption = {
  title?: string;
  description?: string;
};

export type Editors = ErrorsAndControl & {
  title: string;
  source: any;
};

type nextStep<T> = (step: number, data: T) => void;
type Step<T> = {
  nextStep: nextStep<T>;
  state: T;
  step: number;
};

export type NameForm = {
  name: string;
};

export type NameStep = Step<NameForm>;
