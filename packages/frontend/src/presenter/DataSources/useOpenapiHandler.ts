import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { useTourContext } from '../../model/providers';
import { UseOpenapiDataSourceHook, OpenapiForm } from '../../types';
import { clearEmptyFields } from '../../utils';
import { arrayObjectToObject, objectToFieldArray } from './helpers';

const OPENAPI_DEFAULT_STATE = {
  source: undefined,
  sourceFormat: undefined,
  schemaHeaders: undefined,
  operationHeaders: undefined,
  baseUrl: undefined,
  qs: undefined,
  includeHttpDetails: undefined,
  addLimitArgument: undefined,
  genericPayloadArgName: undefined,
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
  const { tour } = useTourContext();

  const { schemaHeaders, operationHeaders, qs, ...handler } = state.handler;

  const defaultValues = Object.assign({}, OPENAPI_DEFAULT_STATE, handler, {
    schemaHeaders: objectToFieldArray(schemaHeaders),
    operationHeaders: objectToFieldArray(operationHeaders),
    qs: objectToFieldArray(qs),
  });

  const disableInputs = tour.isStarted;

  const {
    handleSubmit,
    errors,
    control,
    register,
    formState,
  } = useForm<OpenapiForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });
  const { dirtyFields } = formState;
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
      baseUrl,
      ...cleared
    } = clearEmptyFields(handler);

    const clearBaseUrl = baseUrl === '' && !dirtyFields.baseUrl;
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
          ...(clearBaseUrl ? {} : { baseUrl }),
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
    disableInputs,
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
