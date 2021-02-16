import React from 'react';

import { EditApiTab as Props } from '../../../types';
import { WidgetBody, PrimaryButton } from '../../../ui';
import { useUpdateGeneral } from '../../../presenter/ApiDefs';
import { GeneralForm } from '../Form';

export const GeneralTab: React.FC<Props> = (props) => {
  const {
    onSubmit,
    control,
    errors,
    tokenFields,
    addToken,
    removeToken,
  } = useUpdateGeneral(props);

  return (
    <WidgetBody>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <GeneralForm
          control={control}
          errors={errors}
          tokenFields={tokenFields}
          addToken={addToken}
          removeToken={removeToken}
        />
        <PrimaryButton type="submit">Update general info</PrimaryButton>
      </form>
    </WidgetBody>
  );
};
