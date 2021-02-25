import { useForm } from 'react-hook-form';

import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useToast } from '../../model/providers';
import {
  ApiDefForm,
  AError,
  UseUpdateSchemaAndLimitsHook,
  DataSource,
} from '../../types';

export const useUpdateSchemaAndLimits: UseUpdateSchemaAndLimitsHook = ({
  api,
  refetch,
}) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const {
    _id: id,
    name,
    endpoint,
    playground,
    schema_polling_interval,
    schema_updates_through_control_api,
    request_size_limit,
    request_complexity_limit,
    depth_limit,
    rate_limit,
    sources,
    enabled,
  } = api;

  const { updateApiDef } = useUpdateApiDef({
    onCompleted() {
      refetch();
      showSuccessToast(`API ${name} successfully  updated`);
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const { handleSubmit, register, control, errors } = useForm<ApiDefForm>({
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    defaultValues: {
      schema_polling_interval,
      schema_updates_through_control_api,
      request_size_limit,
      request_complexity_limit,
      depth_limit,
      rate_limit,
    },
  });

  const onSubmit = ({
    schema_polling_interval,
    schema_updates_through_control_api,
    request_size_limit,
    request_complexity_limit,
    depth_limit,
    rate_limit,
  }: ApiDefForm) => {
    const { complexity, per } = rate_limit || {};
    const rateLimit =
      complexity || per
        ? {
            rate_limit: { complexity, per },
          }
        : {};
    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
          playground,
          ...(schema_polling_interval ? { schema_polling_interval } : {}),
          ...(schema_updates_through_control_api
            ? { schema_updates_through_control_api }
            : {}),
          ...(request_size_limit ? { request_size_limit } : {}),
          ...(request_complexity_limit ? { request_complexity_limit } : {}),
          ...(depth_limit ? { depth_limit } : {}),
          ...rateLimit,
        },
        sources: sources.map(({ _id }: DataSource) => _id),
        enabled,
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    control,
    errors,
  };
};
