import { RecordStringAny } from '../types';
import { compose } from './compose';
import { getObjProp } from './getObjProp';
import { isArray } from './isArray';
import { isEmptyObject } from './isEmptyObject';
import { isPOJO } from './isObject';
import { isZeroLength } from './isZeroLength';
import { objectKeys } from './objectKeys';

/**
 * Check if value is empty or default
 * @param val string | null | undefined | number | Array<any> | object
 * @returns boolean
 */
const isEmpty = (
  val: string | null | undefined | number | Array<any> | RecordStringAny
) =>
  val == null ||
  (isArray(val) && isZeroLength(val as Array<any>)) ||
  (isPOJO(val) && isEmptyObject(val as object));

/**
 * If val is POJO clear it or return as is
 * @param val
 * @returns object || val
 */
const clearValueIfPOJO = (val: any) =>
  isPOJO(val) ? clearEmptyFields(val) : val;

/**
 * Clear empty or default react-hook-form submit object
 * @param obj react-hook-form submit object
 * @returns obj
 */
export const clearEmptyFields = (obj: RecordStringAny): RecordStringAny => {
  const getFromObj = getObjProp(obj);

  return objectKeys(obj).reduce((acc, key: string) => {
    const currentVal = compose(clearValueIfPOJO, getFromObj)(key);
    return isEmpty(currentVal)
      ? acc
      : Object.assign({}, acc, { [key]: currentVal });
  }, {} as RecordStringAny);
};
