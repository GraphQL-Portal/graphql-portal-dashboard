import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

import { arrayObjectToObject, objectToFieldArray } from './helpers';

const GRAPHQL_DEFAULT_STATE = {
  endpoint: '',
  method: '',
  schemaHeaders: [],
  operationHeaders: [],
  useGETForQueries: false,
  useSSEForSubscription: false,
  cacheIntrospection: false,
  multipart: false,
};

const suite = vest.create('graphql_handler', ({ endpoint }) => {
  test('endpoint', 'Endpoint is required', () => {
    enforce(endpoint).isNotEmpty();
  });
});

export const useGraphQLHandler = ({
  state,
  updateState,
  step,
}: HandlerStep) => {
  const { schemaHeaders, operationHeaders, ...handler } = state.handler;

  const defaultValues = Object.assign({}, GRAPHQL_DEFAULT_STATE, handler, {
    schemaHeaders: objectToFieldArray(schemaHeaders),
    operationHeaders: objectToFieldArray(operationHeaders),
  });

  const { handleSubmit, errors, control } = useForm({
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

  const onSubmit = ({
    schemaHeaders,
    operationHeaders,
    method,
    ...handler
  }: any) => {
    updateState(
      {
        handler: {
          ...handler,
          schemaHeaders: arrayObjectToObject(schemaHeaders),
          operationHeaders: arrayObjectToObject(operationHeaders),
          ...(method !== '' ? { method } : {}),
        },
      },
      step
    );
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    schemaFields,
    appendSchemaField,
    removeSchemaField,
    operationFields,
    appendOperationField,
    removeOperationField,
  };
};
