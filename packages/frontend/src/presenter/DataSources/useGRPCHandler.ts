import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';
import { arrayObjectToObject } from './helpers';

const suite = vest.create(
  'grpc_handler',
  ({ endpoint, protoFilePath, requestTimeout }) => {
    test('endpoint', 'Endpoint is required', () => {
      enforce(endpoint).isNotEmpty();
    });
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
  certChain: '',
  privateKey: '',
  rootCA: '',
  metadata: [],
};

export const useGRPCHandler = ({ state, updateState, step }: HandlerStep) => {
  const handlerState = Object.assign({}, GRPC_DEFAULT_STATE, state);
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
          [SOURCE_NAMES.GRPC]: {
            endpoint: data.endpoint,
            protoFilePath: data.protoFilePath,
            packageName: data.packageName,
            serviceName: data.serviceName,
            requestTimeout: Number.parseInt(data.requestTimeout) || undefined,
            useHTTPS: data.useHTTPS,
            credentialsSsl: {
              certChain: data.certChain,
              privateKey: data.privateKey,
              rootCA: data.rootCA,
            },
            metaData: arrayObjectToObject(data.metadata),
          },
        },
      },
      step
    );

  const {
    fields: metadataFields,
    append: appendMetadataField,
    remove: removeMetadataField,
  } = useFieldArray({
    control,
    name: 'metadata',
  });

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    metadataFields,
    appendMetadataField,
    removeMetadataField,
  };
};
