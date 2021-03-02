import { getObjProp } from './getObjProp';

export const getObjPropOr = (obj: Record<string, any>, defaultValue: any) => (
  prop: string
) => getObjProp(obj)(prop) ?? defaultValue;
