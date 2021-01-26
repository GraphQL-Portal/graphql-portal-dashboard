import { compose } from '.';
import { queryToJSON } from './queryToJSON';
import { safeJSON } from './safeJSON';

export const safeQueryToJSON = compose(safeJSON, queryToJSON);
