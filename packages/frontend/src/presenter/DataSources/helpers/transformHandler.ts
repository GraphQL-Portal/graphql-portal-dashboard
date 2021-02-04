import { DataSource } from '../../../types';

export const packHandler = (
  { name, handler, transforms }: DataSource,
  key: string
) => {
  return { name, transforms, handler: { [key]: handler } };
};

export const unpackHandler = (
  { handler, name, transforms }: DataSource,
  key: string
) => {
  return { name, transforms, handler: handler[key] };
};
