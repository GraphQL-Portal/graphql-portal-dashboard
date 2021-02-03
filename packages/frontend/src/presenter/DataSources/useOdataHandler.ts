import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';
import { arrayObjectToObject } from './helpers';

const suite = vest.create('odata_handler', ({ baseUrl }) => {
  test('baseUrl', 'baseUrl is required', () => {
    enforce(baseUrl).isNotEmpty();
  });
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
  const handlerState = Object.assign({}, ODATA_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (data: any) =>
    updateState(
      {
        handler: {
          [SOURCE_NAMES.ODATA]: {
            ...data,
            schemaHeaders: arrayObjectToObject(data.schemaHeaders),
            operationHeaders: arrayObjectToObject(data.operationHeaders),
          },
        },
      },
      step
    );

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
