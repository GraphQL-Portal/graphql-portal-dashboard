import { useForm } from 'react-hook-form';
import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useToast } from '../../model/providers';
import { AError, ApiDefForm, UseUpdateWebhooksHook } from '../../types';
import { getProp } from '../../utils';
import { useWebhooks } from './useWebhooks';

export const useUpdateWebhooks: UseUpdateWebhooksHook = ({ api, refetch }) => {
  const { _id: id, name, endpoint, sources, enabled, webhooks } = api;

  const { showErrorToast, showSuccessToast } = useToast();
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
    mode: 'onSubmit',
    defaultValues: {
      webhooks,
    },
  });

  const webhooksMethods = useWebhooks({ control });

  const onSubmit = ({ webhooks = [] }: ApiDefForm) => {
    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
          webhooks,
        },
        sources: sources.map(getProp('_id')),
        enabled,
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
    register,
    ...webhooksMethods,
  };
};
