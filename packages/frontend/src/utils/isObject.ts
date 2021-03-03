import { isArray } from './isArray';

export const isObject = (obj: any) => typeof obj === 'object';
export const isPOJO = (obj: any) =>
  obj != null && isObject(obj) && !isArray(obj);
