import { useForm, useFieldArray } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { vestResolver } from '@hookform/resolvers/vest';

import { useCreateApiDef } from '../../model/ApiDefs/commands';
import { useFormErrors } from '../../model/Hooks';
import { AError, ApiDefForm, UseCreateApiDefHook } from '../../types';
import { ROUTES, useToast } from '../../model/providers';
import { createAuth, createIPsPayload } from './helpers';
import { suite } from './validation';
import { useDSPart } from './useDSPart';
import { useIPFiltering } from './useIPFiltering';

export const useCreateApi: UseCreateApiDefHook = () => {
  const { push } = useHistory();
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
    defaultValues: {
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
      // request_size_limit: '',
      // depth_limit: 0,
      // request_complexity_limit: 0,
      // rate_limit: {
      //   complexity: 0,
      //   per: 0,
      // },
    },
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
          ...rest,
        },
        sources: sourceFields.map(
          ({ value }: Record<string, string>) => sourceTable.current[value]._id
        ),
      },
    });
  };

  return {
    loading,
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
    register,
    options,
    tokenFields,
    addToken,
    removeToken,
    connected,
    onAddSource,
    onRemoveSource,
    ...ipMethods,
  };
};
