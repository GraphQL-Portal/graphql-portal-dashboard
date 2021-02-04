import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

import { arrayObjectToObject, objectToFieldArray } from './helpers';

const suite = vest.create(
  'thrift_handler',
  ({ hostName, port, serviceName, idl }) => {
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
  }
);

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

export const useThriftHandler = ({ state, updateState, step }: HandlerStep) => {
  const { operationHeaders, schemaHeaders, ...handler } = state.handler;
  const defaultValues = Object.assign({}, THRIFT_DEFAULT_STATE, handler, {
    schemaHeaders: objectToFieldArray(schemaHeaders),
    operationHeaders: objectToFieldArray(operationHeaders),
  });
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = ({
    port,
    schemaHeaders,
    operationHeaders,
    ...handler
  }: any) =>
    updateState(
      {
        handler: {
          ...handler,
          port: Number(port),
          schemaHeaders: arrayObjectToObject(schemaHeaders),
          operationHeaders: arrayObjectToObject(operationHeaders),
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
