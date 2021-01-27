import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const suite = vest.create('graphql_handler', ({ endpoint }) => {
  test('endpoint', 'Endpoint is required', () => {
    enforce(endpoint).isNotEmpty();
  });
});

const GRAPHQL_DEFAULT_STATE = {
  endpoint: '',
  schemaHeaders: [],
  operationHeaders: [],
  useGETForQueries: false,
  method: '',
  useSSEForSubscription: false,
  customFetch: '',
  webSocketImpl: '',
  introspection: '',
  cacheIntrospection: '',
  multipart: false,
};

export const useGraphQLHandler = ({ state, updateState }: HandlerStep) => {
  const handlerState = Object.assign({}, GRAPHQL_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
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

  const onSubmit = (data: any) => updateState({ handler: data });

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
