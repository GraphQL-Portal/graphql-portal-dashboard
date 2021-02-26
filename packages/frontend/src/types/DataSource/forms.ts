import {
  OpenapiHandler,
  SelectQueryOrMutationFieldConfig,
} from '@graphql-portal/types';
import { ObjectArrayItem } from '../Forms';
import { FieldArray, FormMethods } from '../HookForm';

export type OpenapiForm = Omit<
  OpenapiHandler,
  | 'customFetch'
  | 'operationHeaders'
  | 'schemaHeaders'
  | 'qs'
  | 'selectQueryOrMutationField'
> & {
  operationHeaders: FieldArray<ObjectArrayItem>;
  schemaHeaders: FieldArray<ObjectArrayItem>;
  qs: FieldArray<ObjectArrayItem>;
  selectQueryOrMutationField: FieldArray<SelectQueryOrMutationFieldConfig>;
};

export type OpenapiFormMethods = FormMethods<OpenapiForm>;
