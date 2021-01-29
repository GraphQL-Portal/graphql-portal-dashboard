import { Title, ElementsTable } from './General';

type Source = { source: any };

export type FormCaption = Partial<Title> & {
  description?: string;
};

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

export type HandlersMapper = ElementsTable;

export type TransformsMapper = ElementsTable;
