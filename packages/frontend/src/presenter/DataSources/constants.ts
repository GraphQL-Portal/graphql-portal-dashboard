import { sourceSchema } from '@graphql-portal/types';
import { compose } from '../../utils';
import {
  getHandler,
  getTransforms,
  resolveSchema,
  filterObjectByList,
} from './helpers';

export const RAW_SCHEMA = sourceSchema;
export const { definitions } = sourceSchema;

// @TODO move this list to config
const HANDLERS_LIST = [
  'graphql',
  'openapi',
  'ContentfulHandler',
  'CrunchbaseHandler',
  'FedexHandler',
  'SalesforceHandler',
  'SlackHandler',
  'StripeHandler',
  'TwitterHandler',
  'WeatherbitHandler',
];
const TRANSFORMS_LIST = ['prefix', 'rename'];

export const RESOLVED_SCHEMA = resolveSchema(RAW_SCHEMA);

// @TODO filter out handlers using transducers or form filters to @graphql-portal/types
export const AVAILABLE_HANDLERS = compose(
  filterObjectByList(HANDLERS_LIST),
  getHandler
)(RESOLVED_SCHEMA);

// @TODO filter out transforms using transducers or form filters to @graphql-portal/types
export const AVAILABLE_TRANSFORMS = compose(
  filterObjectByList(TRANSFORMS_LIST),
  getTransforms
)(RESOLVED_SCHEMA);

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

export const TRANSFORMS_LABELS: { [key: string]: string } = {
  filterSchema: 'Filter Schema',
  namingConvention: 'Naming Convention',
  resolversComposition: 'Resolvers Composition',
};
