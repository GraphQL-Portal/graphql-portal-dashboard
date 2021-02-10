import { DataSource } from '../../../types';

export const packHandler = ({ handler, ...args }: DataSource, key: string) => {
  return { ...args, handler: { [key]: handler } };
};

export const unpackHandler = (
  { handler, ...args }: DataSource,
  key: string
) => {
  return { ...args, handler: handler[key] };
};
