import { IsZeroLength } from '../types';
import { compose } from './compose';
import { getProp } from './getProp';
import { isEqual } from './isEqual';

const isEqualToZero = isEqual(0);

export const isZeroLength: IsZeroLength = compose(
  isEqualToZero,
  getProp('length')
);
