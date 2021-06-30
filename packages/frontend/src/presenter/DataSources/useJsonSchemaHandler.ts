import { useFieldArray, useForm } from 'react-hook-form';
import vest, { test } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import {
  JsonSchemaForm,
  JsonSchemaOperation,
  RecordStringAny,
  UseJsonSchemaHook,
} from '../../types';
import { isZeroLength } from '../../utils';
import enforce from '../validation';
import { arrayObjectToObject, objectToFieldArray } from './helpers';

const URL_ERROR_MESSAGE =
  'Please use absolute URL http://example.com or http://localhost:80';

const suite = vest.create(
  'graphql_handler',
  ({ baseUrl, operations }: JsonSchemaForm) => {
    const urlTest = (name: string, value: string) => {
      test(name, URL_ERROR_MESSAGE, () => {
        enforce(value).isURL();
      });
    };

    test('baseUrl', 'baseUrl is required', () => {
      enforce(baseUrl).isNotEmpty();
    });

    urlTest('baseUrl', baseUrl);

    test('operations', 'Operations is required', () => {
      enforce(operations).lengthNotEquals(0);
    });

    if (!!operations && !isZeroLength(operations)) {
      operations.forEach(
        (
          {
            type,
            field,
            responseSchema,
            responseSample,
            requestSample,
          }: JsonSchemaOperation,
          idx: number
        ) => {
          const name = `operations[${idx}]`;
          test(
            `${name}.type`,
            `Type of the operation ${idx} is required`,
            () => {
              enforce(type).isNotEmpty();
            }
          );

          test(
            `${name}.type`,
            `Field of the operation ${idx} is required`,
            () => {
              enforce(field).isNotEmpty();
            }
          );

          // test(`sample`, 'Response or Request sample is required', () => {
          //   enforce(responseSample || requestSample).isNotEmpty();
          // });
          test(`${name}.responseSample`, 'Response Sample is required', () => {
            enforce(responseSample).isNotEmpty();
          });

          if (responseSample) {
            test(
              `${name}.responseSample`,
              'Should be absolute URL http://example.com or valid JSON',
              () => {
                enforce(responseSample).isJSONorURL();
              }
            );
          }

          // if (requestSample) {
          //   urlTest(`${name}.requestSample`, requestSample);
          // }
        }
      );
    }
  }
);

const JSON_SCHEMA_DEFAULT_STATE = {
  baseUrl: undefined,
  schemaHeaders: undefined,
  operationHeaders: undefined,
  operations: undefined,
  rejectUnauthorized: false,
};

const OPERATION_DEFAULT_VALUE = {
  field: undefined,
  path: undefined,
  type: 'Query',
  method: 'GET',
  // responseSchema: undefined,
  responseSample: undefined,
  // requestSchema: undefined,
  // requestSample: undefined,
  argTypeMap: undefined,
};

export const useJsonSchemaHandler: UseJsonSchemaHook = ({
  state,
  updateState,
  step,
}) => {
  const {
    schemaHeaders,
    operationHeaders,
    operations: ops,
    ...handler
  } = state.handler;
  const defaultValues = Object.assign({}, JSON_SCHEMA_DEFAULT_STATE, handler, {
    schemaHeaders: objectToFieldArray(schemaHeaders),
    operationHeaders: objectToFieldArray(operationHeaders),
    operations: (ops || []).map(
      ({ argTypeMap, ...rest }: JsonSchemaOperation) => ({
        ...rest,
        argTypeMap: objectToFieldArray(argTypeMap),
      })
    ),
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
    operations,
    ...handler
  }: RecordStringAny) => {
    updateState(
      {
        handler: {
          ...handler,
          schemaHeaders: arrayObjectToObject(schemaHeaders),
          operationHeaders: arrayObjectToObject(operationHeaders),
          operations: operations.map(
            ({ argTypeMap, ...rest }: JsonSchemaOperation) => ({
              ...rest,
              argTypeMap: arrayObjectToObject(argTypeMap),
            })
          ),
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
