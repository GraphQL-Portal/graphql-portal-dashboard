export const AVAILABLE_HEAD = [
  'Connector name',
  'Type',
  'Description',
  'Actions',
];

export const CONNECTED_HEAD = ['Name', 'Connector Type', 'Updated', 'Actions'];

export const TRANSFORMS_HEAD = [
  'Transform',
  'Description',
  'Status',
  'Actions',
];

export const ADD_SOURCE_STEPS = [
  { label: 'Name' },
  { label: 'Data Connector Configuration' },
  { label: 'Transforms' },
];

export const GRAPHQL_METHODS = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
];

export const ODATA_BATCHES = [
  { label: '-', value: '' },
  { label: 'multipart', value: 'multipart' },
  { label: 'json', value: 'json' },
];

export const THRIFT_PROTOCOLS = [
  { label: 'Binary', value: 'binary' },
  { label: 'Compact', value: 'compact' },
  { label: 'Json', value: 'json' },
];

export const OPENAPI_SOURCE_FORMAT = [
  { label: '-', value: undefined },
  { label: 'JSON', value: 'json' },
  { label: 'YAML', value: 'yaml' },
];

export const QUERY_OR_MUTATION_FIELD = [
  { label: 'Query', value: 'Query' },
  { label: 'Mutation', value: 'Mutation' },
];
