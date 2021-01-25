import { ErrorsAndControl } from './HookForm';

export type FormCaption = {
  title?: string;
  description?: string;
};

export type EditorWrapper = {
  gapBottom?: number;
};

export type Editors = ErrorsAndControl & {
  title: string;
  source: any;
};
