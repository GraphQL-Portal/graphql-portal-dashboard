import { Refetch } from '../Apollo';
import {
  ControlType,
  ErrorsAndControl,
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
} from '../HookForm';
import { SelectOption } from '../Forms';
import { NOOP } from '../General';
import { DataSource } from '../DataSource';
import { ApiDef } from './data';
import { Fetcher } from './methods';

export type GeneralForm = ErrorsAndControl & {
  addToken: FieldArrayAppend;
  removeToken: FieldArrayRemove;
  tokenFields: FieldArray;
};

export type ApiList = {
  list: ApiDef[];
  onDelete: (api: ApiDef) => NOOP;
  onUpdate: (api: ApiDef) => NOOP;
  onView: (api: ApiDef) => NOOP;
};

export type EditApiTab = {
  api: ApiDef;
  refetch: Refetch;
};

export type DataSourcesForm = ControlType & {
  options: SelectOption[];
  onAddSource(): void;
  connected: DataSource[];
  onRemoveSource(idx: number): NOOP;
};

export type ViewAPITab = {
  fetcher: Fetcher;
  name?: string;
};
