import { useFieldArray, useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import {
  AdditionalResolver,
  AdditionalResolverForm,
  AError,
  UseAdditionalResolverHook,
} from '../../types';
import {
  getObjProp,
  getProp,
  isEqual,
  isZeroLength,
  objectKeys,
} from '../../utils';
import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useToast } from '../../model/providers';
import { createMeshPayload, createMeshDefaultValues } from './helpers';

const createName = (idx: number, key: string) =>
  `mesh.additionalResolvers[${idx}].${key}`;
const isSelectionSet = isEqual('requiredSelectionSet');

const ADDITIONAL_RESOLVER_DEFAULT_VALUE = {
  mesh: {
    additionalResolvers: undefined,
  },
};

const suite = vest.create(
  'edit_additional_resolver',
  ({ mesh }: AdditionalResolverForm) => {
    const { additionalResolvers } = mesh || { additionalResolvers: undefined };
    if (!!additionalResolvers && !isZeroLength(additionalResolvers)) {
      additionalResolvers.forEach(
        (resolver: AdditionalResolver, idx: number) => {
          const getFromResolver = getObjProp(resolver);
          objectKeys(resolver).forEach((key: string) => {
            if (!isSelectionSet(key)) {
              test(createName(idx, key), `${key} is required`, () => {
                enforce(getFromResolver(key)).isNotEmpty();
              });
            }
          });
        }
      );
    }
  }
);

export const useAdditionalResolver: UseAdditionalResolverHook = ({
  api,
  refetch,
}) => {
  const { showErrorToast, showSuccessToast } = useToast();
  const { _id: id, enabled, mesh, sources, name, endpoint, playground } = api;

  const defaultValues = Object.assign(
    {},
    ADDITIONAL_RESOLVER_DEFAULT_VALUE,
    createMeshDefaultValues(mesh)
  );

  const { register, errors, handleSubmit, control } = useForm<
    AdditionalResolverForm
  >({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
    resolver: vestResolver(suite),
  });

  const { updateApiDef } = useUpdateApiDef({
    onCompleted() {
      refetch();
      showSuccessToast(`API ${name} successfully updated`);
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const {
    fields: resolvers,
    append: onAddResolver,
    remove: onRemoveResolver,
  } = useFieldArray({
    control,
    name: 'mesh.additionalResolvers',
  });

  const onSubmit = (data: AdditionalResolverForm) => {
    const mesh = createMeshPayload(data);

    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
          playground,
          mesh,
        },
        sources: sources.map(getProp('_id')),
        enabled,
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
    resolvers,
    onAddResolver,
    onRemoveResolver,
  };
};
