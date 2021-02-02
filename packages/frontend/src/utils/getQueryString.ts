import { compose } from './compose';
import { replaceNewlines } from './replaceNewlines';
import { substringToEnd } from './substringToEnd';
import { decodeURIAndTrim } from './decodeURIAndTrim';
import { safeQueryToJSON } from './safeQueryToJSON';


export const getQueryData = compose(
  safeQueryToJSON,
  replaceNewlines,
  decodeURIAndTrim,
  substringToEnd(1)
);