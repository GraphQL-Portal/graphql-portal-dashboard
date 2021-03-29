import { Refetch } from '../Apollo';
import { ControlType } from '../HookForm';
import { SelectOption } from '../Forms';
import { NOOP } from '../General';
import { DataSource } from '../DataSource';
import { ApiDef } from './data';
import { Fetcher } from './methods';
import {
  UseAdditionalResolverHook,
  UseCreateApiDefHook,
  UseIPFilteringHook,
} from './hooks';

export type ApiList = {
  list: ApiDef[];
  refetch: Refetch;
  onDelete: (api: ApiDef) => NOOP;
  onUpdate: (api: ApiDef) => NOOP;
  onView: (api: ApiDef) => NOOP;
};

export type EditApiTab = {
  api: ApiDef;
  refetch: Refetch;
};

export type ViewAPITab = {
  fetcher: Fetcher;
  name?: string;
};

export type ViewApiHeader = {
  name: string;
  apiEndpoint: string;
};

export type EditApiHeader = ViewApiHeader & EnableSwitch;

export type ApiGeneralForm = Pick<
  ReturnType<UseCreateApiDefHook>,
  'register' | 'control' | 'errors'
>;

export type ApiAuthenticationForm = Pick<
  ReturnType<UseCreateApiDefHook>,
  'register' | 'errors' | 'addToken' | 'removeToken' | 'tokenFields'
>;

export type ApiDataSourcesForm = ControlType & {
  options: SelectOption[];
  onAddSource(): void;
  connected: DataSource[];
  onRemoveSource(idx: number): NOOP;
};

export type ApiSchemaForm = Pick<
  ReturnType<UseCreateApiDefHook>,
  'register' | 'control' | 'errors'
>;

export type APIIPForm = Pick<
  ReturnType<UseCreateApiDefHook>,
  'control' | 'errors' | 'register'
> &
  ReturnType<UseIPFilteringHook>;

export type APILimitsForm = Pick<
  ReturnType<UseCreateApiDefHook>,
  'register' | 'errors'
>;

export type EnableSwitch = {
  api: ApiDef;
  refetch: Refetch;
};

export type AdditionalResolvers = Omit<
  ReturnType<UseAdditionalResolverHook>,
  'onSubmit'
>;

export type AdditionalResolverArguments = Pick<
  AdditionalResolvers,
  'control' | 'errors'
> & {
  nestIndex: number;
};
