import React from 'react';

import { PrimaryButton } from '../../../ui';
import { HandlerStep as Props } from '../../../types';
import { useEditorsHandler } from '../../../presenter/DataSources';
import { Editors } from '../../Editors';

export const EditorsHandler: React.FC<Props> = (props) => {
  const { errors, control, source, onSubmit } = useEditorsHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Editors
        errors={errors}
        control={control}
        source={source}
        title="Handler"
        name="handler"
      />
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
