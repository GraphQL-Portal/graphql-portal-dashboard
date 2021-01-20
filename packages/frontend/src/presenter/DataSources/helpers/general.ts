import { getProp, compose } from '../../../utils';
import { resolveRefs } from './resolveRef';

export const getProperties = getProp('properties');
export const getRef = getProp('$ref');
export const getHandler = compose(getProperties, getProp('handler'));
export const getTransforms = compose(getProperties, getProp('items'), getProp('transforms'));

export const resolveSchema = (schema: any) => compose(resolveRefs(schema), getProperties)(schema);
