import { getProp, getPath, compose, isPOJO, isObject, isArray } from '../../../utils';
import { deconstructRef } from './deconstructRef';

const isRef = (key: string) => key === '$ref';

const resolveItem = (schema: any) => (item: string) => {
  return compose(resolveRefs(schema), getPath(schema), deconstructRef)(item);
};

const resolveObject = (schema: any, obj: any) => {
  if (isArray(obj)) {
    return obj.map((item: any) => (isPOJO(item) ? resolveRefs(schema)(item) : item));
  }

  return resolveRefs(schema)(obj);
};

export const resolveRefs = (schema: any) => (cursor: any) => {
  if (!isPOJO(cursor)) return {};

  return Object.keys(cursor).reduce((acc: any, key: string) => {
    const item = getProp(key)(cursor);
    if (isRef(key)) {
      acc = Object.assign({}, resolveItem(schema)(item), acc);
    } else {
      acc[key] = isObject(item) ? resolveObject(schema, item) : item;
    }

    return acc;
  }, {});
};
