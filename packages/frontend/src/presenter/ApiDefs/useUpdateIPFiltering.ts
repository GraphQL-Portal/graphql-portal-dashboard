import { useForm } from 'react-hook-form';
import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useToast } from '../../model/providers';
import {
  AError,
  ApiDefForm,
  DataSource,
  UseUpdateIPFilteringHook,
} from '../../types';
import {
  arrayStringFromObjectArray,
  arrayToFieldArray,
} from '../DataSources/helpers';
import { useIPFiltering } from './useIPFiltering';

export const useUpdateIPFiltering: UseUpdateIPFilteringHook = ({
  api,
  refetch,
}) => {
  const {
    _id: id,
    name,
    endpoint,
    sources,
    enabled,
    enable_ip_filtering,
    allow_ips,
    deny_ips,
  } = api;

  const { showErrorToast, showSuccessToast } = useToast();
  const { updateApiDef } = useUpdateApiDef({
    onCompleted() {
      refetch();
      showSuccessToast(`API ${name} successfully  updated`);
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const { handleSubmit, control, errors } = useForm<ApiDefForm>({
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    defaultValues: {
      enable_ip_filtering: !!enable_ip_filtering,
      allow_ips: arrayToFieldArray(allow_ips || []),
      deny_ips: arrayToFieldArray(deny_ips || []),
    },
  });

  const ipMethods = useIPFiltering({ control });

  const onSubmit = ({
    enable_ip_filtering,
    allow_ips,
    deny_ips,
  }: ApiDefForm) => {
    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
          enable_ip_filtering,
          allow_ips: arrayStringFromObjectArray(allow_ips || []),
          deny_ips: arrayStringFromObjectArray(deny_ips || []),
        },
        sources: sources.map(({ _id }: DataSource) => _id),
        enabled,
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
    ...ipMethods,
  };
};
