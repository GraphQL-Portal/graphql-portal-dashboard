import { NOOP } from '../General';
import { Errors } from '../HookForm';
import {
  DataSourceStep,
  NameForm,
  HandlerForm,
  TransformsForm,
  SourceProp,
  DataSource,
} from './data';
import { UseOpenapiDataSourceHook } from './hooks';

export type NameStep = DataSourceStep<NameForm>;
export type HandlerStep = DataSourceStep<HandlerForm> & Partial<SourceProp>;
export type TransformsStep = DataSourceStep<TransformsForm> &
  Partial<SourceProp>;

export type TransformEditors = {
  type: string;
  onCancel: NOOP;
  onSuccess(data: any): void;
  value?: any;
};

export type TransformsList = {
  transforms: any[];
  onRemove(idx: number): NOOP;
  onEdit(idx: number, transform: any): NOOP;
};

export type ConnectedList = {
  sources: DataSource[];
  onDelete(idx: number): () => void;
  onUpdate?(source: DataSource): () => void;
};

export type SelectQueryOrMutationFieldConfig = Pick<
  ReturnType<UseOpenapiDataSourceHook>,
  | 'register'
  | 'control'
  | 'queryOrMutationFields'
  | 'removeQueryOrMutationField'
  | 'addQueryOrMutationField'
> & {
  name: string;
} & Errors;
