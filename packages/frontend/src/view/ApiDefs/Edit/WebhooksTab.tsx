import React from 'react';

import { PrimaryButton } from '../../../ui';
import { EditApiTab as Props } from '../../../types';
import { useUpdateWebhooks } from '../../../presenter/ApiDefs';
import { WebhooksForm } from '../Form';
import { useStyles } from './useStyles';

export const WebhooksTab: React.FC<Props> = (props) => {
  const { form } = useStyles();
  const {
    onSubmit,
    control,
    errors,
    register,
    hooks,
    addHook,
    removeHook,
  } = useUpdateWebhooks(props);

  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className={form}>
      <WebhooksForm
        register={register}
        control={control}
        errors={errors}
        hooks={hooks}
        addHook={addHook}
        removeHook={removeHook}
      />
      <PrimaryButton type="submit">Update Data Sources</PrimaryButton>
    </form>
  );
};
