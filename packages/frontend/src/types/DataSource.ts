import React from 'react';
import { ErrorsAndControl } from './HookForm';

export type FormCaption = {
  title?: string;
  description?: string;
};

export type Editors = ErrorsAndControl & {
  title: string;
  source: any;
};

type updateState<T> = (data: T) => void;
type Step<T> = {
  updateState: updateState<T>;
  state: T;
};

export type NameForm = {
  name: string;
};

export type HandlerForm = {
  handler: any;
};

export type NameStep = Step<NameForm>;
export type HandlerStep = Step<HandlerForm> & { source?: any };

export type HandlersMapper = {
  [key: string]: React.JSXElementConstructor<any>;
};
