import { Title, ElementsTable } from './General';

type Source = { source: any };

export type FormCaption = Partial<Title> & {
  description?: string;
};

type updateState<T> = (data: T, step: number) => void;
type Step<T> = {
  updateState: updateState<T>;
  state: T;
  step: number;
};

export type NameForm = { name: string };
export type HandlerForm = { handler: any };
export type TransformsForm = { transforms: any[] };

export type NameStep = Step<NameForm>;
export type HandlerStep = Step<HandlerForm> & Partial<Source>;
export type TransformsStep = Step<TransformsForm> & Partial<Source>;

export type HandlersMapper = ElementsTable;

export type TransformsMapper = ElementsTable;

export type TransformEditors = {
  type: string;
  onCancel(): void;
  onSuccess(data: any): void;
  value?: any;
};

export type TransformsList = {
  transforms: any[];
  onRemove(idx: number): () => void;
  onEdit(idx: number, transform: any): () => void;
};

export type DataSource = NameForm &
  HandlerForm &
  TransformsForm & {
    _id: string;
    updatedAt?: string;
  };

export type ConnectedList = {
  sources: DataSource[];
  onDelete(idx: number): () => void;
  onUpdate?(idx: number): () => void;
};
