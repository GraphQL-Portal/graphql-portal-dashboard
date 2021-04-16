export const source = {
  state: {
    handler: {
      openapi: {
        source: 'https://petstore.swagger.io/v2/swagger.json',
        sourceFormat: 'json',
        includeHttpDetails: false,
        addLimitArgument: false,
        genericPayloadArgName: false,
        baseUrl: 'https://petstore.swagger.io/v2',
      },
    },
    name: 'Pets data source',
    transforms: [],
    _id: '606da954c311df94519279b8',
  },
};

export const api = {
  name: 'Pets API',
  endpoint: '/pets',
  authentication: {
    auth_header_name: '',
  },
  schema_polling_interval: 0,
  request_size_limit: '',
  request_complexity_limit: 0,
  depth_limit: 0,
  rate_limit: {
    complexity: 0,
    per: 0,
  },
  playground: true,
  source: 'Pets data source',
  schema_updates_through_control_api: false,
  enable_ip_filtering: false,
};

export const query = `{
  findPetsByStatus(status: PENDING) {
    name
    status
    tags {
      name
    }
  }
}`;
