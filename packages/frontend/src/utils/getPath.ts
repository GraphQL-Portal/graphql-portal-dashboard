import { RecordStringAny } from '../types';

export const getPath = (obj: RecordStringAny) => (path: string[]) =>
  path.reduce((acc: RecordStringAny, key: string) => acc[key], obj);
