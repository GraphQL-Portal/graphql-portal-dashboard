import { useForm, useFieldArray } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { vestResolver } from '@hookform/resolvers/vest';

import { useCreateApiDef } from '../../model/ApiDefs/commands';
import { useFormErrors } from '../../model/Hooks';
import { AError, ApiDefForm } from '../../types';
import { ROUTES, useToast } from '../../model/providers';
import { createAuth } from './helpers';
import { suite } from './validation';
import { useDSPart } from './useDSPart';

export const useCreateApi = () => {
  const { push } = useHistory();
  const { showSuccessToast, showErrorToast } = useToast();
  const { createApiDef } = useCreateApiDef({
    onCompleted() {
      push(ROUTES.APIS);
      showSuccessToast('Successfully created new API');
    },
    onError({ message }: AError) {
      showErrorToast({ message });
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
  } = useDSPart(control, watch, setValue);

  useFormErrors(errors);

  const {
    fields: tokenFields,
    append: addToken,
    remove: removeToken,
  } = useFieldArray({ control, name: 'authentication.auth_tokens' });

  const onSubmit = ({ authentication, name, endpoint, playground }: any) => {
    createApiDef({
      variables: {
        apiDef: {
          name,
          endpoint,
          playground,
          ...createAuth(authentication),
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
    options,
    tokenFields,
    addToken,
    removeToken,
    connected,
    onAddSource,
    onRemoveSource,
    register,
  };
};
