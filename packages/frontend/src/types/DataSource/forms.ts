import {
  OpenapiHandler,
  PrefixTransformConfig,
  SelectQueryOrMutationFieldConfig,
  RenameTransformObject,
} from '@graphql-portal/types';
import { ObjectArrayItem, StringArrayItem } from '../Forms';
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

export type PrefixForm = Omit<PrefixTransformConfig, 'ignore'> & {
  ignore: FieldArray<StringArrayItem>;
};

export type PrefixFormMethods = FormMethods<PrefixForm>;

export type RenameForm = {
  items: RenameTransformObject[];
};

export type RenameFormMethods = FormMethods<RenameForm>;
