import { NOOP } from '../General';
import {
  DataSourceStep,
  NameForm,
  HandlerForm,
  TransformsForm,
  SourceProp,
  DataSource,
} from './data';

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
