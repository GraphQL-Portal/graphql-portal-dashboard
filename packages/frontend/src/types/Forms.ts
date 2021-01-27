import { ErrorsAndControl } from './HookForm';

type onAdd = (value: any) => void;
type onRemove = (value: any) => void;

export type ObjectArray = {
  onAdd: onAdd;
  onRemove: onRemove;
  title: string;
  fields: any[];
  name: string;
} & ErrorsAndControl;
