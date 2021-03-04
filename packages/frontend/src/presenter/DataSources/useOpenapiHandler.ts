import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { UseOpenapiDataSourceHook, OpenapiForm } from '../../types';
import { clearEmptyFields } from '../../utils';
import { arrayObjectToObject, objectToFieldArray } from './helpers';

const OPENAPI_DEFAULT_STATE = {
  source: null,
  sourceFormat: undefined,
  schemaHeaders: undefined,
  operationHeaders: undefined,
  baseUrl: null,
  qs: undefined,
  includeHttpDetails: null,
  addLimitArgument: null,
  genericPayloadArgName: null,
  selectQueryOrMutationField: undefined,
};

const suite = vest.create('graphql_handler', ({ source }) => {
  test('source', 'Source is required', () => {
    enforce(source).isNotEmpty();
  });
});

export const useOpenapiHandler: UseOpenapiDataSourceHook = ({
  state,
  updateState,
  step,
}) => {
  const { schemaHeaders, operationHeaders, qs, ...handler } = state.handler;

  const defaultValues = Object.assign({}, OPENAPI_DEFAULT_STATE, handler, {
    schemaHeaders: objectToFieldArray(schemaHeaders),
    operationHeaders: objectToFieldArray(operationHeaders),
    qs: objectToFieldArray(qs),
  });

  const { handleSubmit, errors, control, register } = useForm<OpenapiForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const {
    fields: schemaFields,
    append: appendSchemaField,
    remove: removeSchemaField,
  } = useFieldArray({
    control,
    name: 'schemaHeaders',
  });

  const {
    fields: operationFields,
    append: appendOperationField,
    remove: removeOperationField,
  } = useFieldArray({
    control,
    name: 'operationHeaders',
  });

  const {
    fields: qsFields,
    append: appendQSField,
    remove: removeQSField,
  } = useFieldArray({
    control,
    name: 'qs',
  });

  const {
    fields: queryOrMutationFields,
    append: addQueryOrMutationField,
    remove: removeQueryOrMutationField,
  } = useFieldArray({
    control,
    name: 'selectQueryOrMutationField',
  });

  const onSubmit = (handler: OpenapiForm) => {
    const {
      schemaHeaders,
      operationHeaders,
      qs,
      ...cleared
    } = clearEmptyFields(handler);
    console.log('CLEARED IS: ', cleared);
    updateState(
      {
        handler: {
          ...cleared,
          ...(schemaHeaders
            ? { schemaHeaders: arrayObjectToObject(schemaHeaders) }
            : {}),
          ...(operationHeaders
            ? { operationHeaders: arrayObjectToObject(operationHeaders) }
            : {}),
          ...(qs ? { qs: arrayObjectToObject(qs) } : {}),
        },
      },
      step
    );
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    register,
    schemaFields,
    appendSchemaField,
    removeSchemaField,
    operationFields,
    appendOperationField,
    removeOperationField,
    qsFields,
    appendQSField,
    removeQSField,
    queryOrMutationFields,
    addQueryOrMutationField,
    removeQueryOrMutationField,
  };
};
