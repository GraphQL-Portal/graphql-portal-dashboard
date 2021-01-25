import { getProp } from '../../../utils';
import { stringHas } from './stringsHas';

export const getFilteredSources = (query: string, sources: any) => {
  const strHasQuery = stringHas(query);
  return Object.keys(sources).reduce((acc: any, key) => {
    const source = getProp(key)(sources);
    const { title = '', description = '' } = source;
    if (strHasQuery(title) || strHasQuery(description)) {
      acc[key] = source;
    }
    return acc;
  }, {});
};
