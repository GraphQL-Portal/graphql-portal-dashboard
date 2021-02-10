import { compose, hasIndex, toLowerCase } from '../../../utils';

export const stringHas = (query: string) =>
  compose(hasIndex(toLowerCase(query)), toLowerCase);
