import { isArray } from './isArray';

export const isObject = (obj: any) => typeof obj === 'object';
/**
 * Check if value is POJO
 * @param obj
 * @returns boolean
 */
export const isPOJO = (obj: any) =>
  obj != null && isObject(obj) && !isArray(obj);
