import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { arrayObjectToObject, objectToFieldArray } from './helpers';
import { isUrl } from '../validation';

const suite = vest.create(
  'grpc_handler',
  ({ endpoint, protoFilePath, requestTimeout }) => {
    test('endpoint', 'Endpoint is required', () => {
      enforce(endpoint).isNotEmpty();
    });

    test(
      'endpoint',
      'Please use absolute URL http://example.com or http://localhost:80',
      () => {
        isUrl(endpoint);
      }
    );

    test('protoFilePath', 'gRPC Proto file path is required', () => {
      enforce(protoFilePath).isNotEmpty();
    });
  }
);

const GRPC_DEFAULT_STATE = {
  endpoint: '',
  protoFilePath: '',
  packageName: '',
  serviceName: '',
  requestTimeout: '',
  useHTTPS: false,
  metaData: [],
  credentialsSsl: {
    certChain: '',
    privateKey: '',
    rootCA: '',
  },
};

export const useGRPCHandler = ({ state, updateState, step }: HandlerStep) => {
  const { metaData, ...handler } = state.handler;
  const defaultValues = Object.assign({}, GRPC_DEFAULT_STATE, handler, {
    metaData: objectToFieldArray(metaData),
  });

  const { handleSubmit, errors, control, register } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const {
    fields: metadataFields,
    append: appendMetadataField,
    remove: removeMetadataField,
  } = useFieldArray({
    control,
    name: 'metaData',
  });

  const onSubmit = ({ requestTimeout, metaData, ...handler }: any) => {
    updateState(
      {
        handler: {
          ...handler,
          requestTimeout: Number.parseInt(requestTimeout) || undefined,
          metaData: arrayObjectToObject(metaData),
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
    metadataFields,
    appendMetadataField,
    removeMetadataField,
  };
};
