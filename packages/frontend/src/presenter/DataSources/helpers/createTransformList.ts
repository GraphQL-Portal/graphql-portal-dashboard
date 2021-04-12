import { AVAILABLE_TRANSFORMS } from '../constants';
import { formatTransformStrings } from './formatTransformStrings';
import { getHandlerKey } from './getHandlerKey';

export const createTransformList = (transforms: any[]) =>
  transforms.map((transform: any) => {
    const key = getHandlerKey(transform);
    const { description = '' } = AVAILABLE_TRANSFORMS[key];
    return {
      name: key,
      title: formatTransformStrings(key),
      description,
      ...transform,
    };
  });
