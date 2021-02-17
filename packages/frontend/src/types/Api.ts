import { DataSource } from './DataSource';
import { QueryHook, Refetch } from './Apollo';
import {
  ControlType,
  ErrorsAndControl,
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
  OnSubmit,
} from './HookForm';
import { SelectOption } from './Forms';
import { NOOP } from './General';
import { UseTabsHook } from './Tabs';

export type ApiAuth<T> = {
  auth_header_name: string;
  auth_tokens: T;
};

export type ApiAuthFields = ApiAuth<{ value: string }[]>;

export type ApiDef = {
  _id: string;
  name: string;
  endpoint: string;
  authentication: ApiAuth<string[]>;
  enabled: boolean;
  playground: boolean;
  createdAt: string;
  updatedAt: string;
  sources: DataSource[];
};

export type ApiListItem = ApiDef & { status: string };

export type ApiList = {
  list: ApiListItem[];
  onDelete: (index: number) => any;
  onUpdate: (index: number) => any;
};

export type EditApiTab = {
  api: ApiDef;
  refetch: Refetch;
};

export type StringArray = { value: string }[];

export type GeneralForm = ErrorsAndControl & {
  addToken: FieldArrayAppend;
  removeToken: FieldArrayRemove;
  tokenFields: FieldArray;
};

export type DataSourcesForm = ControlType & {
  options: SelectOption[];
  onAddSource(): void;
  connected: DataSource[];
  onRemoveSource(idx: number): NOOP;
};

export type GetApiDefsData = {
  getApiDefs: {
    apiDefs: ApiDef[];
  };
};

export type GetApiDefById = {
  getApiDefById: ApiDef;
};

export type UseApiByIdHook = () => ReturnType<QueryHook<ApiDef>> &
  ReturnType<UseTabsHook>;

export type UseUpdateDataSourcesHook = (
  props: EditApiTab
) => {
  onSubmit: OnSubmit;
  options: SelectOption[];
  connected: any[];
  onAddSource: NOOP;
  onRemoveSource(idx: number): NOOP;
  loading: boolean;
} & ControlType;
