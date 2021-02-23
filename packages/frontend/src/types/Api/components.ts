import { Refetch } from '../Apollo';
import { ControlType } from '../HookForm';
import { SelectOption } from '../Forms';
import { NOOP } from '../General';
import { DataSource } from '../DataSource';
import { ApiDef } from './data';
import { Fetcher } from './methods';
import { UseCreateApiDefHook } from './hooks';

export type ApiGeneralForm = Pick<
  ReturnType<UseCreateApiDefHook>,
  'register' | 'control' | 'errors' | 'addToken' | 'removeToken' | 'tokenFields'
>;

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

export type ApiDataSourcesForm = ControlType & {
  options: SelectOption[];
  onAddSource(): void;
  connected: DataSource[];
  onRemoveSource(idx: number): NOOP;
};

export type ViewAPITab = {
  fetcher: Fetcher;
  name?: string;
};

export type ApiSchemaForm = Pick<
  ReturnType<UseCreateApiDefHook>,
  'register' | 'control' | 'errors'
>;
