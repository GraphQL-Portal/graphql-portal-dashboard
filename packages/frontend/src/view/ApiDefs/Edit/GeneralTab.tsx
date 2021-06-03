import React from 'react';

import { EditApiTab as Props } from '../../../types';
import { PrimaryButton } from '../../../ui';
import { useUpdateGeneral } from '../../../presenter/ApiDefs';
import { AuthenticationForm, GeneralForm } from '../Form';
import { useStyles } from './useStyles';

export const GeneralTab: React.FC<Props> = (props) => {
  const {
    onSubmit,
    control,
    errors,
    tokenFields,
    addToken,
    removeToken,
    register,
    loading,
  } = useUpdateGeneral(props);
  const { form } = useStyles();

  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className={form}>
      <GeneralForm register={register} control={control} errors={errors} />
      <AuthenticationForm
        register={register}
        errors={errors}
        tokenFields={tokenFields}
        addToken={addToken}
        removeToken={removeToken}
      />
      <PrimaryButton loading={loading} type="submit">
        Update general info
      </PrimaryButton>
    </form>
  );
};
