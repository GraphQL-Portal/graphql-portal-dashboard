import { DataSource } from '../../../types';
import { getPackageName } from './transformHandlerName';

export const packHandler = ({ handler, ...args }: DataSource, key: string) => {
  return { ...args, handler: { [getPackageName(key)]: handler } };
};

export const unpackHandler = (
  { handler, ...args }: DataSource,
  key: string
) => {
  return { ...args, handler: handler[key] };
};
