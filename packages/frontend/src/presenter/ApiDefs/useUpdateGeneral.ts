import { useForm, useFieldArray } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';

import {
  DataSource,
  AError,
  UseUpdateGeneralHook,
  ApiDefForm,
} from '../../types';
import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useFormErrors } from '../../model/Hooks';
import { useToast } from '../../model/providers';
import { getUuid } from '../../utils';
import { arrayToFieldArray } from '../DataSources/helpers';
import { createAuth } from './helpers';
import { suite } from './validation';

export const useUpdateGeneral: UseUpdateGeneralHook = ({ api, refetch }) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const {
    _id: id,
    name,
    endpoint,
    authentication,
    playground,
    sources,
    enabled,
  } = api;

  const { auth_header_name = '', auth_tokens = [] } = authentication || {};

  const { updateApiDef } = useUpdateApiDef({
    onCompleted() {
      refetch();
      showSuccessToast(`API ${name} successfully updated`);
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const { handleSubmit, control, errors, register } = useForm<ApiDefForm>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(suite),
    defaultValues: {
      name,
      endpoint,
      playground,
      authentication: {
        auth_header_name,
        auth_tokens: arrayToFieldArray(auth_tokens),
      },
    },
  });

  useFormErrors(errors);

  const {
    fields: tokenFields,
    append: addToken,
    remove: removeToken,
  } = useFieldArray({ control, name: 'authentication.auth_tokens' });

  const onAddToken = () => addToken({ value: getUuid() });

  const onSubmit = ({ authentication, name, endpoint, playground }: any) => {
    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
          playground,
          ...createAuth(authentication),
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
    tokenFields,
    addToken: onAddToken,
    removeToken,
  };
};
