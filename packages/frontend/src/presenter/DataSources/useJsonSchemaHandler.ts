import { useFieldArray, useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';
import { useFormErrors } from '../../model/Hooks';
import { HandlerStep, JsonSchemaForm, RecordStringAny } from '../../types';

import { arrayObjectToObject, objectToFieldArray } from './helpers';
import { isUrl } from './validation';
import { isZeroLength } from '../../utils';

const suite = vest.create('graphql_handler', ({ baseUrl, operations }) => {
  test('baseUrl', 'baseUrl is required', () => {
    enforce(baseUrl).isNotEmpty();
  });

  test(
    'baseUrl',
    'Please use absolute URL http://example.com or http://localhost:80',
    () => {
      isUrl(baseUrl);
    }
  );

  test('operations', 'Operations is required', () => {
    enforce(operations).lengthNotEquals(0);
  });

  if (!!operations && !isZeroLength(operations)) {
    operations.forEach(
      ({ type, field, responseSchema, requestSchema }: any, idx: number) => {
        const name = `operations[${idx}]`;
        test(`${name}.type`, `Type of the operation ${idx} is required`, () => {
          enforce(type).isNotEmpty();
        });

        test(
          `${name}.type`,
          `Field of the operation ${idx} is required`,
          () => {
            enforce(field).isNotEmpty();
          }
        );

        test(
          `${name}.responseSchema`,
          `Response Schema of the operation ${idx} is required`,
          () => {
            enforce(responseSchema).isNotEmpty();
          }
        );
      }
    );
  }
});

const JSON_SCHEMA_DEFAULT_STATE = {
  baseUrl: undefined,
  schemaHeaders: undefined,
  operationHeaders: undefined,
  operations: undefined,
};

const OPERATION_DEFAULT_VALUE = {
  field: undefined,
  path: undefined,
  type: 'Query',
  method: 'GET',
  responseSchema: undefined,
  responseTypeName: undefined,
  requestSchema: undefined,
  requestTypeName: undefined,
};

export const useJsonSchemaHandler = ({
  state,
  updateState,
  step,
}: HandlerStep) => {
  const {
    schemaHeaders,
    operationHeaders,
    operations: ops,
    ...handler
  } = state.handler;
  const defaultValues = Object.assign({}, JSON_SCHEMA_DEFAULT_STATE, handler, {
    schemaHeaders: objectToFieldArray(schemaHeaders),
    operationHeaders: objectToFieldArray(operationHeaders),
    operations: ops,
  });

  const { register, control, handleSubmit, errors } = useForm<JsonSchemaForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
    resolver: vestResolver(suite),
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
    fields: operations,
    append: addOperation,
    remove: removeOperation,
  } = useFieldArray({
    control,
    name: 'operations',
  });

  const onAddOperation = () => addOperation(OPERATION_DEFAULT_VALUE);

  const onSubmit = ({
    schemaHeaders,
    operationHeaders,
    ...handler
  }: RecordStringAny) => {
    updateState(
      {
        handler: {
          ...handler,
          schemaHeaders: arrayObjectToObject(schemaHeaders),
          operationHeaders: arrayObjectToObject(operationHeaders),
        },
      },
      step
    );
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    control,
    errors,
    schemaFields,
    appendSchemaField,
    removeSchemaField,
    operationFields,
    appendOperationField,
    removeOperationField,
    operations,
    addOperation: onAddOperation,
    removeOperation,
  };
};
