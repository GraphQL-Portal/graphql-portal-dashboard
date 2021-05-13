import {
  RenameTransformObject,
  SelectQueryOrMutationFieldConfig,
} from '@graphql-portal/types';
import { ObjectArrayItem, StringArrayItem } from '../Forms';
import { NOOP } from '../General';
import {
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
  OnSubmit,
} from '../HookForm';
import { HandlerStep, NameStep, TransformStep } from './components';
import { JsonSchemaOperation, NameFormMethods } from './data';
import {
  OpenapiFormMethods,
  PrefixFormMethods,
  RenameFormMethods,
  SalesforceFormMethods,
  CrunchbaseFormMethods,
  TwitterFormMethods,
  StripeFormMethods,
  FusionCreatorAIUSFormMethods,
  JsonSchemaFormMethods,
  FusionCreatorAIPSD2STETFormMethods,
  FilterTransformFormMethods,
  NamingConventionFormMethods,
  SlackFormMethods,
  ContentfulFormMethods,
  FhirFormMethods,
  Neo4JFormMethods,
  SoapFormMethods,
  TuqlFormMethods,
} from './forms';

type OnFormSubmit = {
  onSubmit: OnSubmit;
};

export type UseOpenapiDataSourceHook = (
  props: HandlerStep
) => Pick<OpenapiFormMethods, 'register' | 'errors' | 'control'> & {
  onSubmit: OnSubmit;
  schemaFields: FieldArray<ObjectArrayItem>;
  appendSchemaField: FieldArrayAppend;
  removeSchemaField: FieldArrayRemove;
  operationFields: FieldArray<ObjectArrayItem>;
  appendOperationField: FieldArrayAppend;
  removeOperationField: FieldArrayRemove;
  qsFields: FieldArray<ObjectArrayItem>;
  appendQSField: FieldArrayAppend;
  removeQSField: FieldArrayRemove;
  queryOrMutationFields: FieldArray<SelectQueryOrMutationFieldConfig>;
  addQueryOrMutationField: FieldArrayAppend;
  removeQueryOrMutationField: FieldArrayRemove;
  disableInputs: boolean;
};

export type UsePrefixTransformHook = (
  props: TransformStep
) => Pick<PrefixFormMethods, 'control' | 'errors' | 'register'> &
  OnFormSubmit & {
    ignoredTypes: FieldArray<StringArrayItem>;
    addIgnoredTypes: FieldArrayAppend;
    removeIgnoredTypes: FieldArrayRemove;
  };

export type UseRenameTransformHook = (
  props: TransformStep
) => Pick<RenameFormMethods, 'control' | 'errors' | 'register'> &
  OnFormSubmit & {
    items: FieldArray<RenameTransformObject>;
    onAdd: FieldArrayAppend;
    onRemove: FieldArrayRemove;
  };

export type UseSalesforceHandlerHook = (
  props: HandlerStep
) => Pick<SalesforceFormMethods, 'register' | 'errors'> & OnFormSubmit;
export type UseCrunchbaseHandlerHook = (
  props: HandlerStep
) => Pick<CrunchbaseFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type useFusionCreatorAccountInformationUSHandlerHook = (
  props: HandlerStep
) => Pick<FusionCreatorAIUSFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type useFusionCreatorAccountInformationPSD2STETHandlerHook = (
  props: HandlerStep
) => Pick<FusionCreatorAIPSD2STETFormMethods, 'errors' | 'register'> &
  OnFormSubmit;

export type UseTwitterHandlerHook = (
  props: HandlerStep
) => Pick<TwitterFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type UseStripeHandlerHook = (
  props: HandlerStep
) => Pick<StripeFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type UseJsonSchemaHook = (
  props: HandlerStep
) => Pick<JsonSchemaFormMethods, 'errors' | 'control' | 'register'> &
  OnFormSubmit & {
    schemaFields: FieldArray<ObjectArrayItem>;
    appendSchemaField: FieldArrayAppend;
    removeSchemaField: FieldArrayRemove;
    operationFields: FieldArray<ObjectArrayItem>;
    appendOperationField: FieldArrayAppend;
    removeOperationField: FieldArrayRemove;
    operations: FieldArray<JsonSchemaOperation>;
    addOperation: NOOP;
    removeOperation: FieldArrayRemove;
  };

export type UseFilterTransformHook = (
  props: TransformStep
) => Pick<FilterTransformFormMethods, 'register' | 'errors' | 'control'> &
  OnFormSubmit & {
    filters: FieldArray<ObjectArrayItem>;
    onAddFilter: NOOP;
    onRemoveFilter: FieldArrayRemove;
  };

export type UseNamingConventionTransformHook = (
  props: TransformStep
) => Pick<NamingConventionFormMethods, 'control'> & OnFormSubmit;

export type UseSlackHandlerHook = (
  props: HandlerStep
) => Pick<SlackFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type UseContentfulHandlerHook = (
  props: HandlerStep
) => Pick<ContentfulFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type UseFhirHandlerHook = (
  props: HandlerStep
) => Pick<FhirFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type UseNeo4JHandlerHook = (
  props: HandlerStep
) => Pick<Neo4JFormMethods, 'errors' | 'register' | 'control'> & OnFormSubmit;

export type UseSoapHandlerHook = (
  props: HandlerStep
) => Pick<SoapFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type UseAddDataSourceNameHook = (
  props: NameStep
) => Pick<NameFormMethods, 'errors' | 'register'> & OnFormSubmit;

export type UseTuqlHandlerHook = (
  props: HandlerStep
) => Pick<TuqlFormMethods, 'errors' | 'register'> & OnFormSubmit;
