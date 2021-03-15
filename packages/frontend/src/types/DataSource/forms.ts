import {
  OpenapiHandler,
  PrefixTransformConfig,
  SelectQueryOrMutationFieldConfig,
  RenameTransformObject,
  SalesforceHandler,
  CrunchbaseHandler,
  TwitterHandler,
  StripeHandler,
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

export type RenameForm = { items: RenameTransformObject[] };
export type RenameFormMethods = FormMethods<RenameForm>;

export type SalesforceForm = SalesforceHandler;
export type SalesforceFormMethods = FormMethods<SalesforceForm>;

export type CrunchbaseForm = CrunchbaseHandler;
export type CrunchbaseFormMethods = FormMethods<CrunchbaseForm>;

export type TwitterForm = TwitterHandler;
export type TwitterFormMethods = FormMethods<TwitterForm>;

export type StripeForm = StripeHandler;
export type StripeFormMethods = FormMethods<StripeForm>;
