import { getProp, getPath, compose } from '../../utils';

const getProperties = getProp('properties');
const getRef = getProp('$ref');
const getDescription = getProp('description');

const getHandlerRef = compose(getRef, getProp('handler'), getProperties);
export const getHandlers = (sourceSchema: any) => compose(
  getProperties,
  getPath(sourceSchema),
  deconstructRef,
  getHandlerRef
)(sourceSchema);


export const getAvailableSources = (handlers: any, sourceSchema: any) => {
  return Object.keys(handlers).reduce((acc: any, key: string) => {
    const handler = getProp(key)(handlers);
    acc[key] = Object.assign(
      {},
      { description: getDescription(handler) || '' },
      compose(getPath(sourceSchema), deconstructRef, getRef)(handler)
    );
    return acc;
  }, {});
};

const stringHas = (str: string, query: string) =>
  str
    .toLocaleLowerCase()
    .indexOf(query.toLocaleLowerCase()) !== -1;

export const getFilteredSources = (query: string, sources: any) =>
  Object.keys(sources).reduce(
    (acc: any, key) => {
      const source = sources[key];
      const { title, description } = source;
      if (stringHas(title, query) || stringHas(description, query)) {
        acc[key] = source;
      }
      return acc
    }, {}
  );

export const deconstructRef = (ref: string) => ref.split('/').slice(1);
