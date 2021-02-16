import { DataSource } from './DataSource';
import {
  ControlType,
  ErrorsAndControl,
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
} from './HookForm';
import { SelectOption } from './Forms';
import { NOOP } from './General';

export type ApiDef = {
  _id: string;
  name: string;
  endpoint: string;
  authentication: {
    auth_header_name: string;
    auth_tokens: string[];
  };
  enable: boolean;
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
