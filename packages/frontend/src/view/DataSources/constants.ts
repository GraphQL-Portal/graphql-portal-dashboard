export const AVAILABLE_HEAD = [
  'Connector name',
  'Type',
  'Description',
  'Actions',
];

export const CONNECTED_HEAD = [
  'Name',
  'Connector Type',
  'Status',
  'Created',
  'Actions',
];

export const TRANSFORMS_HEAD = [
  'Transform',
  'Description',
  'Status',
  'Actions',
];

export const ADD_SOURCE_STEPS = [
  {
    label: 'Name',
  },
  {
    label: 'Handler',
  },
  {
    label: 'Transforms',
  },
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
