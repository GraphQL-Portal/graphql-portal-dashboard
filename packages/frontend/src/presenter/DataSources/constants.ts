import { sourceSchema } from '@graphql-portal/types';

import { resolveRefs, getHandler, getTransforms, getProperties } from './helpers';
export const RAW_SCHEMA = sourceSchema;

export const RESOLVED_SCHEMA = resolveRefs(RAW_SCHEMA)(getProperties(RAW_SCHEMA));
console.log('RESOLVED REFS: ', RESOLVED_SCHEMA);

export const AVAILABLE_DATA_SOURCES = getHandler(RESOLVED_SCHEMA);
export const AVAILABLE_TRANSFORMS = getTransforms(RESOLVED_SCHEMA);
console.log('TRANSFORMS: ', AVAILABLE_TRANSFORMS);
