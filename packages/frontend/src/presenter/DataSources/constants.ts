import { sourceSchema } from '@graphql-portal/types';
import Ajv from 'ajv';

import {
  resolveRefs,
  getHandler,
  getTransforms,
  getProperties,
} from './helpers';

export const RAW_SCHEMA = sourceSchema;
console.log('RAW: ', RAW_SCHEMA)

export const RESOLVED_SCHEMA = resolveRefs(RAW_SCHEMA)(getProperties(RAW_SCHEMA));
console.log('RESOLVED REFS: ', RESOLVED_SCHEMA);

export const AVAILABLE_DATA_SOURCES = getHandler(RESOLVED_SCHEMA);
export const AVAILABLE_TRANSFORMS = getTransforms(RESOLVED_SCHEMA);
console.log('TRANSFORMS: ', AVAILABLE_TRANSFORMS);

const schema = {
  definitions: Object.assign({}, sourceSchema.definitions),
  properties: {
    fhir: { $ref: '#/definitions/FhirHandler' },
  },
  title: 'Handler',
  type: 'object',
};

const ajv = new Ajv();

const validate = ajv.compile(schema);


console.log('SCHEMA IS: ', schema);
console.log('VALIDATE IS: ', validate({ fhir: {
  endpoint: 'hello'
}}));
