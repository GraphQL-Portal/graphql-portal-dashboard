import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';
import { arrayObjectToObject } from './helpers';

const suite = vest.create('thrift_handler', ({ hostName, port, serviceName, idl }) => {
  test('hostName', 'hostName is required', () => {
    enforce(hostName).isNotEmpty();
  });
  test('idl', 'idl is required', () => {
    enforce(idl).isNotEmpty();
  });
  test('serviceName', 'Service name is required', () => {
    enforce(serviceName).isNotEmpty();
  });
  test('port', 'Port is required', () => {
    enforce(port).isNotEmpty();
  });
  test('port', 'Port has to be numeric', () => {
    enforce(port).isNumeric();
  });
});

const THRIFT_DEFAULT_STATE = {
  hostName: '',
  https: false,
  idl: '',
  path: '',
  port: '',
  serviceName: '',
  protocol: 'binary',
  operationHeaders: [],
  schemaHeaders: [],
};

export const useThriftHandler = ({ state, updateState }: HandlerStep) => {
  const handlerState = Object.assign({}, THRIFT_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (data: any) => updateState({
    handler: {
      [SOURCE_NAMES.THRIFT]: {
        ...data,
        port: Number(data.port),
        schemaHeaders: arrayObjectToObject(data.schemaHeaders),
        operationHeaders: arrayObjectToObject(data.operationHeaders),
      }
    }
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
