import { IsZeroLength } from '../types';
import { compose } from './compose';
import { getProp } from './getProp';
import { isEqual } from './isEqual';

const isEqualToZero = isEqual(0);

/**
 * Check if entity that has length property is equal to 0
 * @var arr
 * @returns boolean
 */
export const isZeroLength: IsZeroLength = compose(
  isEqualToZero,
  getProp('length')
);
