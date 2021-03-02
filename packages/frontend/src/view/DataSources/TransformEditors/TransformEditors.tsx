import React from 'react';

import { TransformStep as Props } from '../../../types';
import { useTransformEditors } from '../../../presenter/DataSources';
import { PrimaryButton, OutlineButton } from '../../../ui';
import { Editors } from '../../Editors';
import { useStyles } from './useStyles';

export const TransformEditors: React.FC<Props> = (props) => {
  const { onCancel } = props;
  const { source, onSubmit, control, errors } = useTransformEditors(props);
  const { cancelButton } = useStyles();

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Editors
        errors={errors}
        control={control}
        source={source}
        title="Transform"
        name="transform"
      />
      <OutlineButton onClick={onCancel} className={cancelButton}>
        Cancel
      </OutlineButton>
      <PrimaryButton type="submit">Add transform</PrimaryButton>
    </form>
  );
};
