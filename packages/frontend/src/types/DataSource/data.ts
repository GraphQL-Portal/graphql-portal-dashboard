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
  };

export type SourceStep = {
  connector?: {
    properties?: Record<string, unknown>;
  };
};
