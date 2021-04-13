import { vestResolver } from '@hookform/resolvers/vest';
import { useFieldArray, useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';

import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useToast } from '../../model/providers';
import { AError, CacheTransformForm, UseCacheHook } from '../../types';
import {
  getObjProp,
  getProp,
  isEqual,
  isZeroLength,
  objectKeys,
} from '../../utils';

const createName = (idx: number, key: string) => `cache[${idx}].${key}`;
const isField = isEqual('field');

const suite = vest.create('edit_cache', ({ cache }: CacheTransformForm) => {
  if (!!cache && !isZeroLength(cache)) {
    cache.forEach((cacheItem, idx: number) => {
      const getFromItem = getObjProp(cacheItem);
      objectKeys(cacheItem).forEach((key: string) => {
        if (isField(key)) {
          test(createName(idx, key), `${key} is required`, () => {
            enforce(getFromItem(key)).isNotEmpty();
          });
        }
      });
    });
  }
});

export const useCacheTransform: UseCacheHook = ({ api, refetch }) => {
  const { showErrorToast, showSuccessToast } = useToast();
  const {
    _id: id,
    enabled,
    mesh,
    sources,
    name,
    endpoint,
    playground,
    invalidate_cache_through_control_api,
  } = api;

  const caches = mesh?.transforms
    ?.filter((t) => Object.keys(t)[0] === 'cache')
    .map((t) => [...t.cache!])
    ?.flat(3);

  const defaultValues: CacheTransformForm = {
    invalidate_cache_through_control_api: Boolean(
      invalidate_cache_through_control_api
    ),
    cache: JSON.parse(JSON.stringify(caches || [])),
  };

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
    fields: cache,
    append: onAddCache,
    remove: onRemoveCache,
  } = useFieldArray({
    control,
    name: 'cache',
  });

  const onSubmit = ({
    invalidate_cache_through_control_api,
    cache,
  }: CacheTransformForm) => {
    const nextCache = cache?.map((cache) => {
      const resultCache = { ...cache };
      if (cache.invalidate?.ttl) {
        resultCache.invalidate!.ttl = +cache.invalidate.ttl;
      }
      return resultCache;
    });
    const nextMesh = {
      ...mesh,
      transforms: nextCache
        ? [
            {
              cache: nextCache,
            },
          ]
        : [],
    };

    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
          playground,
          mesh: nextMesh,
          invalidate_cache_through_control_api,
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
    cache,
    onAddCache,
    onRemoveCache,
    control,
  };
};
