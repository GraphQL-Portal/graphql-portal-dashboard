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
  'ContentfulHandler',
  'CrunchbaseHandler',
  'SalesforceHandler',
  'SlackHandler',
  'StripeHandler',
  'TwitterHandler',
  'WeatherbitHandler',
  'IPAPIHandler',
];

const TRANSFORMS_LIST = [
  'filterSchema',
  'namingConvention',
  'prefix',
  'rename',
];

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
  sourceSchema: '',
};

export const HANDLERS_LABELS: { [key: string]: string } = {
  OpenapiHandler: 'OpenAPI',
  MongooseHandler: 'MongoDB',
  GrpcHandler: 'gRPC',
  PostGraphileHandler: 'PostgreSQL',
};

export const HANDLERS_DESCRIPTIONS: { [key: string]: string } = {
  FhirHandler:
    'FHIR (Fast Healthcare Interoperability Resources) Protocol handler',
  MySQLHandler: 'Handler for MySQL databases',
  MongooseHandler: 'Handler for MongoDB database (based on Mongoose)',
  OpenapiHandler: 'Handler for Swagger / OpenAPI 2/3 specification',
  JsonSchemaHandler: 'Handler for JSON Schema specification',
};

export const TRANSFORMS_LABELS: { [key: string]: string } = {
  filterSchema: 'Filter Schema',
  namingConvention: 'Naming Convention',
  resolversComposition: 'Resolvers Composition',
};

export const TRANSFORM_DESCRIPTIONS: { [key: string]: string } = {
  filterSchema:
    'Transformer to filter (white/black list) GraphQL types, fields and arguments',
  rename: 'Transformer to rename GraphQL types and fields',
};

export const CUSTOM_HANDLER_TO_PACKAGE: Record<string, string> = {
  ContentfulHandler: '@graphql-portal/contentful',
  CrunchbaseHandler: '@graphql-portal/crunchbase',
  IPAPIHandler: '@graphql-portal/ip-api',
  SalesforceHandler: '@graphql-portal/salesforce',
  SlackHandler: '@graphql-portal/slack',
  StripeHandler: '@graphql-portal/stripe',
  TwitterHandler: '@graphql-portal/twitter',
  WeatherbitHandler: '@graphql-portal/weatherbit',
};

export const PACKAGE_TO_CUSTOM_HANDLER: Record<string, string> = {
  '@graphql-portal/contentful': 'ContentfulHandler',
  '@graphql-portal/crunchbase': 'CrunchbaseHandler',
  '@graphql-portal/ip-api': 'IPAPIHandler',
  '@graphql-portal/salesforce': 'SalesforceHandler',
  '@graphql-portal/slack': 'SlackHandler',
  '@graphql-portal/stripe': 'StripeHandler',
  '@graphql-portal/twitter': 'TwitterHandler',
  '@graphql-portal/weatherbit': 'WeatherbitHandler',
};
