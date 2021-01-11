import { getProp, compose } from '../../../utils';

export const getProperties = getProp('properties');
export const getHandler = compose(getProperties, getProp('handler'));
export const getTransforms = compose(getProperties, getProp('items'), getProp('transforms'));
