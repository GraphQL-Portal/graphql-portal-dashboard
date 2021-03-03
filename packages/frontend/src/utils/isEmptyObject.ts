import { compose } from './compose';
import { objectKeys } from './objectKeys';
import { isZeroLength } from './isZeroLength';
import { IsEmptyObject } from '../types';

export const isEmptyObject: IsEmptyObject = compose(isZeroLength, objectKeys);
