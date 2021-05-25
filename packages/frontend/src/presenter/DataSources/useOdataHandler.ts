import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

import { arrayObjectToObject, objectToFieldArray } from './helpers';
import enforce from '../validation';

const suite = vest.create('odata_handler', ({ baseUrl }) => {
  test('baseUrl', 'baseUrl is required', () => {
    enforce(baseUrl).isNotEmpty();
  });

  test(
    'baseUrl',
    'Please use absolute URL http://example.com or http://localhost:80',
    () => {
      enforce(baseUrl).isURL();
    }
  );
});

const ODATA_DEFAULT_STATE = {
  baseUrl: '',
  batch: '',
  expandNavProps: false,
  metadata: '',
  operationHeaders: [],
  schemaHeaders: [],
};

export const useOdataHandler = ({ state, updateState, step }: HandlerStep) => {
  const { schemaHeaders, operationHeaders, ...handler } = state.handler;
  const defaultValues = Object.assign({}, ODATA_DEFAULT_STATE, handler, {
    schemaHeaders: objectToFieldArray(schemaHeaders),
    operationHeaders: objectToFieldArray(operationHeaders),
  });

  const { handleSubmit, errors, control, register } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

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

  useFormErrors(errors);

  const onSubmit = ({
    schemaHeaders,
    operationHeaders,
    batch,
    ...handler
  }: any) =>
    updateState(
      {
        handler: {
          ...handler,
          schemaHeaders: arrayObjectToObject(schemaHeaders),
          operationHeaders: arrayObjectToObject(operationHeaders),
          ...(batch !== '' ? { batch } : {}),
        },
      },
      step
    );

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
  };
};
