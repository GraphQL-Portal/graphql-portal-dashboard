import { sourceSchema } from '@graphql-portal/types';
import { getHandler, getTransforms, resolveSchema } from './helpers';

export const RAW_SCHEMA = sourceSchema;
console.log('RAW: ', RAW_SCHEMA);
export const { definitions } = sourceSchema;

export const RESOLVED_SCHEMA = resolveSchema(RAW_SCHEMA);
console.log('RESOLVED REFS: ', RESOLVED_SCHEMA);

export const AVAILABLE_DATA_SOURCES = getHandler(RESOLVED_SCHEMA);
export const AVAILABLE_TRANSFORMS = getTransforms(RESOLVED_SCHEMA);
console.log('TRANSFORMS: ', AVAILABLE_TRANSFORMS);

export const AJV_SCHEMA_TEMPLATE = {
  definitions,
  title: 'Handler',
  type: 'object',
};

export const INITIAL_STATE = {
  name: '',
  handler: {},
  transforms: [],
};

export const ODATA_BATCHES = [
  { label: '-', value: '' },
  { label: 'multipart', value: 'multipart' },
  { label: 'json', value: 'json' },
]

export const THRIFT_PROTOCOLS = [
  { label: 'Binary', value: 'binary' },
  { label: 'Compact', value: 'compact' },
  { label: 'Json', value: 'json' },
]