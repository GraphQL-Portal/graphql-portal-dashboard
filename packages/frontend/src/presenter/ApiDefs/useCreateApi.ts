import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { useSources } from '../../model/DataSources/queries';

export const useCreateApi = () => {
  const { control, errors, handleSubmit, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      endpoint: '',
      sources: [],
      authentication: {
        auth_header_name: '',
        auth_header_tokens: [],
      },
    },
  });

  const {
    fields: tokenFields,
    append: addToken,
    remove: removeToken,
  } = useFieldArray({ control, name: 'authentication.auth_header_tokens' });

  const onSubmit = (data: any) => console.log('FORM DATA IS: ', data);

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
    tokenFields,
    addToken,
    removeToken,
  };
};
