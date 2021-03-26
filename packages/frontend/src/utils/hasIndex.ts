import { ArrayLikeEntity } from '../types';

export const hasIndex = (value: any) => (item: ArrayLikeEntity) =>
  item.indexOf(value) !== -1;
