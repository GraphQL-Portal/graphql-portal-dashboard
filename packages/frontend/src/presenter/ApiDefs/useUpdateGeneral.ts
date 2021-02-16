import { useForm, useFieldArray } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';

import { EditApiTab, DataSource, AError } from '../../types';
import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useFormErrors } from '../../model/Hooks';
import { useToast } from '../../model/providers';
import { arrayToFieldArray } from '../DataSources/helpers';
import { createAuth } from './helpers';
import { suite } from './validation';

export const useUpdateGeneral = ({ api, refetch }: EditApiTab) => {
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
      showSuccessToast(`Api ${name} successfully  updated`);
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const { handleSubmit, control, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(suite),
    defaultValues: {
      name,
      endpoint,
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

  const onSubmit = ({ authentication, name, endpoint }: any) => {
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
    control,
    errors,
    tokenFields,
    addToken,
    removeToken,
  };
};
