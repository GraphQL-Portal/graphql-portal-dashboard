import {
  RenameTransformObject,
  SelectQueryOrMutationFieldConfig,
} from '@graphql-portal/types';
import { ObjectArrayItem, StringArrayItem } from '../Forms';
import {
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
  OnSubmit,
} from '../HookForm';
import { HandlerStep, TransformStep } from './components';
import {
  OpenapiFormMethods,
  PrefixFormMethods,
  RenameFormMethods,
} from './forms';

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
};

export type UsePrefixTransformHook = (
  props: TransformStep
) => Pick<PrefixFormMethods, 'control' | 'errors' | 'register'> & {
  onSubmit: OnSubmit;
  ignoredTypes: FieldArray<StringArrayItem>;
  addIgnoredTypes: FieldArrayAppend;
  removeIgnoredTypes: FieldArrayRemove;
};

export type UseRenameTransformHook = (
  props: TransformStep
) => Pick<RenameFormMethods, 'control' | 'errors' | 'register'> & {
  onSubmit: OnSubmit;
  items: FieldArray<RenameTransformObject>;
  onAdd: FieldArrayAppend;
  onRemove: FieldArrayRemove;
};
