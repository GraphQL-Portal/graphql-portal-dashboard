import React from 'react';
import { ErrorsAndControl } from './HookForm';

type Source = { source: any };
type Title = { title: string };

export type FormCaption = Partial<Title> & {
  description?: string;
};

export type Editors = ErrorsAndControl & Title & Source;

type updateState<T> = (data: T) => void;
type Step<T> = {
  updateState: updateState<T>;
  state: T;
};

export type NameForm = { name: string };
export type HandlerForm = { handler: any };
export type TransformsForm = { transforms: any[] };

export type NameStep = Step<NameForm>;
export type HandlerStep = Step<HandlerForm> & Partial<Source>;
export type TransformsStep = Step<TransformsForm> & Partial<Source>;

export type HandlersMapper = {
  [key: string]: React.JSXElementConstructor<any>;
};
