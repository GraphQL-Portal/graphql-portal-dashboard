import { sourceSchema } from '@graphql-portal/types';
import { getHandler, getTransforms, resolveSchema } from './helpers';

export const RAW_SCHEMA = sourceSchema;
export const { definitions } = sourceSchema;

export const RESOLVED_SCHEMA = resolveSchema(RAW_SCHEMA);

export const AVAILABLE_DATA_SOURCES = getHandler(RESOLVED_SCHEMA);
export const AVAILABLE_TRANSFORMS = getTransforms(RESOLVED_SCHEMA);

export const AJV_SCHEMA_TEMPLATE = {
  definitions,
  title: 'Handler',
  type: 'object',
};

export const INITIAL_STATE = {
  _id: '',
  name: '',
  handler: {},
  transforms: [],
};

export const TRANSFORMS_LABELS: { [key: string]: string } = {
  filterSchema: 'Filter Schema',
  namingConvention: 'Naming Convention',
  resolversComposition: 'Resolvers Composition',
};
