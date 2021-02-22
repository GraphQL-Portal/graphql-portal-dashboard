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
  'fhir',
  'graphql',
  'grpc',
  'jsonSchema',
  'mongoose',
  'mysql',
  'neo4j',
  'odata',
  'openapi',
  'postgraphile',
  'soap',
  'thrift',
  'tuql',
  'ContentfulHandler',
  'CrunchbaseHandler',
  'FedexHandler',
  'SalesforceHandler',
  'SlackHandler',
  'StripeHandler',
  'TwitterHandler',
  'WeatherbitHandler',
  'IPAPIHandler',
];
const TRANSFORMS_LIST = ['prefix', 'rename'];

export const RESOLVED_SCHEMA = resolveSchema(RAW_SCHEMA);

// @TODO filter out handlers using transducers
export const AVAILABLE_HANDLERS = compose(
  filterObjectByList(HANDLERS_LIST),
  getHandler
)(RESOLVED_SCHEMA);

// @TODO filter out transforms using transducers
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
