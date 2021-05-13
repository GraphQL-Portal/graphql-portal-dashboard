import {
  OpenapiHandler,
  PrefixTransformConfig,
  SelectQueryOrMutationFieldConfig,
  RenameTransformObject,
  SalesforceHandler,
  CrunchbaseHandler,
  TwitterHandler,
  StripeHandler,
  FusionCreatorAccountInformationUSHandler,
  FusionCreatorAccountInformationPSD2STETHandler,
  SlackHandler,
  ContentfulHandler,
  FhirHandler,
} from '@graphql-portal/types';
import { ObjectArray, ObjectArrayItem, StringArrayItem } from '../Forms';
import { FieldArray, FormMethods } from '../HookForm';
import { JsonSchemaOperation } from './data';

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

export type FusionCreatorAIUSForm = FusionCreatorAccountInformationUSHandler;
export type FusionCreatorAIUSFormMethods = FormMethods<FusionCreatorAIUSForm>;

export type FusionCreatorAIPSD2STETForm = FusionCreatorAccountInformationPSD2STETHandler;
export type FusionCreatorAIPSD2STETFormMethods = FormMethods<FusionCreatorAIPSD2STETForm>;

export type TwitterForm = TwitterHandler;
export type TwitterFormMethods = FormMethods<TwitterForm>;

export type SlackForm = SlackHandler;
export type SlackFormMethods = FormMethods<SlackForm>;

export type StripeForm = StripeHandler;
export type StripeFormMethods = FormMethods<StripeForm>;

export type SearchAvailableForm = { search: string };

export type JsonSchemaForm = {
  baseUrl: string;
  schemaHeaders?: ObjectArray;
  operationHeaders: ObjectArray;
  operations: JsonSchemaOperation[];
};

export type JsonSchemaFormMethods = FormMethods<JsonSchemaForm>;

export type FilterTransformForm = {
  mode: string;
  filters: FieldArray<StringArrayItem>;
};
export type FilterTransformFormMethods = FormMethods<FilterTransformForm>;
export type NamingConventionForm = {
  enumValues: string;
  fieldNames: string;
  typeNames: string;
};
export type NamingConventionFormMethods = FormMethods<NamingConventionForm>;

export type ContentfulForm = ContentfulHandler;
export type ContentfulFormMethods = FormMethods<ContentfulForm>;

export type FhirForm = FhirHandler;
export type FhirFormMethods = FormMethods<FhirHandler>;
