import React from 'react';

import { useTransformEditors } from '../../../presenter/DataSources';
import { PrimaryButton, OutlineButton } from '../../../ui';
import { Editors } from '../../Editors';
import { useStyles } from './useStyles';

type Props = {
  type: string;
  onCancel(): void;
  onSuccess(data: any): void;
};

export const TransformEditors: React.FC<Props> = ({
  type,
  onCancel,
  onSuccess,
}) => {
  const { source, onSubmit, control, errors } = useTransformEditors(
    type,
    onCancel,
    onSuccess
  );
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
