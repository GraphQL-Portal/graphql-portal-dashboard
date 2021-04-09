import { useForm, useFieldArray } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { vestResolver } from '@hookform/resolvers/vest';

import { useCreateApiDef } from '../../model/ApiDefs/commands';
import { useFormErrors } from '../../model/Hooks';
import { AError, ApiDefForm, UseCreateApiDefHook } from '../../types';
import { ROUTES, useToast, useTourContext } from '../../model/providers';
import { getUuid } from '../../utils';
import {
  createAuth,
  createIPsPayload,
  createRateLimitPayload,
} from './helpers';
import { suite } from './validation';
import { useDSPart } from './useDSPart';
import { useIPFiltering } from './useIPFiltering';

const defaultValues = {
  name: '',
  endpoint: '',
  source: '',
  sources: [],
  playground: true,
  authentication: {
    auth_header_name: '',
    auth_tokens: [],
  },
  schema_polling_interval: 0,
  schema_updates_through_control_api: false,
  enable_ip_filtering: false,
  allow_ips: [],
  deny_ips: [],
  request_size_limit: '',
  request_complexity_limit: 0,
  depth_limit: 0,
  rate_limit: {
    complexity: 0,
    per: 0,
  },
};

export const useCreateApi: UseCreateApiDefHook = () => {
  const { push } = useHistory();
  const { tour } = useTourContext();
  const { showSuccessToast, showErrorToast } = useToast();
  const { createApiDef } = useCreateApiDef({
    onCompleted() {
      push(ROUTES.APIS);
      showSuccessToast('Successfully created new API');
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const {
    control,
    errors,
    handleSubmit,
    watch,
    setValue,
    register,
  } = useForm<ApiDefForm>({
    mode: 'onSubmit',
    defaultValues: tour.isStarted ? tour.api : defaultValues,
    resolver: vestResolver(suite),
  });

  const {
    options,
    connected,
    sourceFields,
    onAddSource,
    onRemoveSource,
    sourceTable,
    loading,
  } = useDSPart({ control, watch, setValue });

  const ipMethods = useIPFiltering({ control });

  useFormErrors(errors);

  const {
    fields: tokenFields,
    append: addToken,
    remove: removeToken,
  } = useFieldArray({ control, name: 'authentication.auth_tokens' });

  const onAddToken = () => addToken({ value: getUuid() });

  const onSubmit = (data: ApiDefForm) => {
    const {
      authentication,
      name,
      endpoint,
      playground,
      source,
      enable_ip_filtering,
      allow_ips,
      deny_ips,
      schema_polling_interval,
      request_size_limit,
      request_complexity_limit,
      depth_limit,
      rate_limit,
      ...rest
    } = data;
    createApiDef({
      variables: {
        apiDef: {
          name,
          endpoint,
          playground,
          ...createAuth(authentication),
          ...createIPsPayload(enable_ip_filtering, allow_ips, deny_ips),
          ...(schema_polling_interval! > 0 ? { schema_polling_interval } : {}),
          ...(request_size_limit! !== '' ? { request_size_limit } : {}),
          ...(request_complexity_limit! > 0
            ? { request_complexity_limit }
            : {}),
          ...(depth_limit! > 0 ? { depth_limit } : {}),
          ...createRateLimitPayload(rate_limit),
          ...rest,
        },
        sources: sourceFields.map(
          ({ value }: Record<string, string>) => sourceTable.current[value]._id
        ),
      },
    });
  };

  return {
    disableSelectDatasources: tour.isStarted,
    loading,
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
    register,
    options,
    tokenFields,
    addToken: onAddToken,
    removeToken,
    connected,
    onAddSource,
    onRemoveSource,
    ...ipMethods,
  };
};
