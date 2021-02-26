import { OpenapiHandler } from '@graphql-portal/types';
import { FieldArray } from '../HookForm';

export type OpenapiForm = Omit<
  OpenapiHandler,
  'customFetch' | 'operationHeaders' | 'schemaHeaders' | 'qs'
> & {
  operationHeaders: FieldArray;
  schemaHeaders: FieldArray;
  qs: FieldArray;
};
