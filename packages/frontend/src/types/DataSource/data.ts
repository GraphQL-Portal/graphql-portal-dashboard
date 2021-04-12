import { ObjectArray } from '../Forms';
import { Title, ElementsTable } from '../General';
import { updateState } from './methods';

export type SourceProp = { source: any };
export type FormCaption = Partial<Title> & {
  description?: string;
};

export type HandlersMapper = ElementsTable;

export type TransformsMapper = ElementsTable;

export type DataSourceStep<T> = {
  updateState: updateState<T>;
  state: T;
  step: number;
};

export type NameForm = { name: string };
export type HandlerForm = { handler: any };
export type TransformsForm = { transforms: any[] };

export type DataSource = NameForm &
  HandlerForm &
  TransformsForm & {
    _id?: string;
    updatedAt?: string;
    sourceSchema: string;
  };

export type SourceStep = {
  connector?: {
    properties?: Record<string, unknown>;
  };
};

export type JsonSchemaOperation = {
  field: string;
  path: string;
  type: string;
  method: string;
  responseSchema: string;
  responseTypeName?: string;
  requestSchema: string;
  requestTypeName?: string;
};

export type JsonSchemaForm = {
  baseUrl: string;
  schemaHeaders?: ObjectArray;
  operationHeaders: ObjectArray;
  operations: JsonSchemaOperation[];
};
