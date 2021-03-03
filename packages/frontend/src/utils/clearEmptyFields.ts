import { RecordStringAny } from '../types';
import { compose } from './compose';
import { getObjProp } from './getObjProp';
import { isArray } from './isArray';
import { isEmptyObject } from './isEmptyObject';
import { isPOJO } from './isObject';
import { isZeroLength } from './isZeroLength';
import { objectKeys } from './objectKeys';

const isEmpty = (
  val: string | null | undefined | number | Array<any> | object
) =>
  val === '' ||
  val == null ||
  val === 0 ||
  (isArray(val) && isZeroLength(val as Array<any>)) ||
  (isPOJO(val) && isEmptyObject(val as object));

const clearValueIfPOJO = (val: any) =>
  isPOJO(val) ? clearEmptyFields(val) : val;

export const clearEmptyFields = (obj: RecordStringAny): RecordStringAny => {
  const getFromObj = getObjProp(obj);

  return objectKeys(obj).reduce((acc, key: string) => {
    const currentVal = compose(clearValueIfPOJO, getFromObj)(key);
    return isEmpty(currentVal)
      ? acc
      : Object.assign({}, acc, { [key]: currentVal });
  }, {} as RecordStringAny);
};
