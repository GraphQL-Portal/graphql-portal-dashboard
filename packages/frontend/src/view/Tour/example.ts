export const source = {
  key: 'openapi',
  connector: {
    additionalProperties: false,
    type: 'object',
    title: 'OpenapiHandler',
    properties: {
      source: {
        anyOf: [
          {
            type: 'object',
            additionalProperties: true,
          },
          {
            type: 'string',
          },
          {
            type: 'array',
            additionalItems: true,
          },
        ],
        description:
          'A pointer to your API source - could be a local file, remote file or url endpoint',
      },
      sourceFormat: {
        type: 'string',
        enum: ['json', 'yaml'],
        description: 'Format of the source file (Allowed values: json, yaml)',
      },
      operationHeaders: {
        type: 'object',
        properties: {},
        description:
          'JSON object representing the Headers to add to the runtime of the API calls',
      },
      schemaHeaders: {
        type: 'object',
        properties: {},
        description:
          'If you are using a remote URL endpoint to fetch your schema, you can set headers for the HTTP request to fetch your schema.',
      },
      baseUrl: {
        type: 'string',
        description:
          'Specifies the URL on which all paths will be based on.\nOverrides the server object in the OAS.',
      },
      qs: {
        type: 'object',
        properties: {},
        description:
          'JSON object representing the query search parameters to add to the API calls',
      },
      customFetch: {
        anyOf: [
          {
            type: 'object',
            additionalProperties: true,
          },
          {
            type: 'string',
          },
          {
            type: 'array',
            additionalItems: true,
          },
        ],
        description: 'W3 Compatible Fetch Implementation',
      },
      includeHttpDetails: {
        type: 'boolean',
        description: 'Include HTTP Response details to the result object',
      },
      addLimitArgument: {
        type: 'boolean',
        description:
          "Auto-generate a 'limit' argument for all fields that return lists of objects, including ones produced by links",
      },
      genericPayloadArgName: {
        type: 'boolean',
        description:
          "Set argument name for mutation payload to 'requestBody'. If false, name defaults to camelCased pathname",
      },
      selectQueryOrMutationField: {
        type: 'array',
        items: {
          additionalProperties: false,
          type: 'object',
          title: 'SelectQueryOrMutationFieldConfig',
          properties: {
            title: {
              type: 'string',
              description: 'OAS Title',
            },
            path: {
              type: 'string',
              description: 'Operation Path',
            },
            type: {
              type: 'string',
              enum: ['Query', 'Mutation'],
              description:
                'Target Root Type for this operation (Allowed values: Query, Mutation)',
            },
            method: {
              type: 'string',
              description: 'Which method is used for this operation',
            },
          },
        },
        additionalItems: false,
        description:
          'Allows to explicitly override the default operation (Query or Mutation) for any OAS operation',
      },
    },
    required: ['source'],
    description:
      'Handler for Swagger / OpenAPI 2/3 specification. Source could be a local json/swagger file, or a url to it.',
  },
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
