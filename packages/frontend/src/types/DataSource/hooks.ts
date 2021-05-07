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
import { HandlerStep, TransformStep } from './components';
import { JsonSchemaOperation } from './data';
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
) => Pick<CrunchbaseFormMethods, 'errors' | 'control'> & OnFormSubmit;

export type useFusionCreatorAccountInformationUSHandlerHook = (
  props: HandlerStep
) => Pick<FusionCreatorAIUSFormMethods, 'errors' | 'control'> & {
  onSubmit: OnSubmit;
};

export type useFusionCreatorAccountInformationPSD2STETHandlerHook = (
  props: HandlerStep
) => Pick<FusionCreatorAIPSD2STETFormMethods, 'errors' | 'control'> & {
  onSubmit: OnSubmit;
};

export type UseTwitterHandlerHook = (
  props: HandlerStep
) => Pick<TwitterFormMethods, 'errors' | 'control'> & OnFormSubmit;

export type UseStripeHandlerHook = (
  props: HandlerStep
) => Pick<StripeFormMethods, 'errors' | 'control'> & OnFormSubmit;

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
