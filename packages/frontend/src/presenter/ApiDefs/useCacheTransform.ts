import { vestResolver } from '@hookform/resolvers/vest';
import { useFieldArray, useForm } from 'react-hook-form';
import vest, { enforce, test } from 'vest';
import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useToast } from '../../model/providers';
import { AError, CacheTransformForm, UseCacheHook } from '../../types';
import { getObjProp, getProp, isEqual, objectKeys } from '../../utils';

const createName = (idx: number, key: string) =>
  `mesh.transforms[${idx}].${key}`;
const isField = isEqual('requiredField');

const suite = vest.create('edit_cache', (caches: CacheTransformForm = []) => {
  caches.forEach((cache, idx: number) => {
    const getFromResolver = getObjProp(cache);
    objectKeys(cache).forEach((key: string) => {
      if (isField(key)) {
        test(createName(idx, key), `${key} is required`, () => {
          enforce(getFromResolver(key)).isNotEmpty();
        });
      }
    });
  });
});

export const useCacheTransform: UseCacheHook = ({ api, refetch }) => {
  const { showErrorToast, showSuccessToast } = useToast();
  const { _id: id, enabled, mesh, sources, name, endpoint, playground } = api;

  const defaultValues = mesh?.transforms || [];

  const {
    register,
    errors,
    handleSubmit,
    control,
  } = useForm<CacheTransformForm>({
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
    fields: transforms,
    append: onAddTransform,
    remove: onRemoveTransform,
  } = useFieldArray({
    control,
    name: 'mesh.transforms',
  });

  const onSubmit = (data: CacheTransformForm) => {
    const nextMesh = {
      ...mesh,
      transforms: [
        {
          cache: data.mesh.transforms[0].cache.map((cache) => {
            const resultCache = { ...cache };
            if (cache.invalidate?.ttl) {
              resultCache.invalidate!.ttl = +cache.invalidate.ttl;
            }
            return resultCache;
          }),
        },
      ],
    };

    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
          playground,
          mesh: nextMesh,
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
    transforms,
    onAddTransform,
    onRemoveTransform,
    control,
  };
};
