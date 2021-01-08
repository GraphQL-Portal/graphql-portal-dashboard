import { getProp, getPath, compose, isPOJO, isObject, isArray } from '../../utils';

const deconstructRef = (ref: string) => ref.split('/').slice(1);

export const getProperties = getProp('properties');

export const getHandler = compose(getProperties, getProp('handler'));
export const getTransforms = compose(getProp('items'), getProp('transforms'));

const stringHas = (str: string, query: string) =>
  str
    .toLocaleLowerCase()
    .indexOf(query.toLowerCase()) !== -1;

export const getFilteredSources = (query: string, sources: any) =>
  Object.keys(sources).reduce(
    (acc: any, key) => {
      const source = getProp(key)(sources);
      const { title, description } = source;
      if (stringHas(title || '', query) || stringHas(description || '', query)) {
        acc[key] = source;
      }
      return acc
    }, {}
  );

const isRef = (key: string) => key === '$ref';

const resolveItem = (schema: any) => (item: string) => {
  return compose(resolveRefs(schema), getPath(schema), deconstructRef)(item)
}

const resolveObject = (schema: any, obj: any) => {
  if (isArray(obj)) {
    return obj.map((item: any) => isPOJO(item) ? resolveRefs(schema)(item) : item);
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
