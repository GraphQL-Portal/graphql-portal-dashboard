import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControlLabel } from '@material-ui/core';

import { Checkbox, Input, OutlineButton, PrimaryButton } from '../../../ui';
import { TransformStep as Props } from '../../../types';
import { usePrefixTransform } from '../../../presenter/DataSources';
import { StringArray } from '../../Form';
import { HandlerRow, HandlerCol } from '../Layout';
import { useStyles } from './useStyles';

export const PrefixTransform: React.FC<Props> = (props) => {
  const { cancelButton } = useStyles();
  const { onCancel } = props;
  const {
    onSubmit,
    register,
    errors,
    control,
    ignoredTypes,
    addIgnoredTypes,
    removeIgnoredTypes,
  } = usePrefixTransform(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            name="value"
            error={!!errors?.value}
            label="The prefix to apply to the schema types."
            fullWidth
            required
          />
        </HandlerCol>
      </HandlerRow>
      <StringArray
        name="ignore"
        title="Ignored types"
        fields={ignoredTypes}
        onAdd={addIgnoredTypes}
        onRemove={removeIgnoredTypes}
        register={register}
        errors={errors}
      />
      <HandlerRow>
        <HandlerCol>
          <FormControlLabel
            label="Changes root types and changes the field names"
            control={
              <Controller
                name="includeRootOperations"
                control={control}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerCol>
      </HandlerRow>
      <OutlineButton onClick={onCancel} className={cancelButton}>
        Cancel
      </OutlineButton>
      <PrimaryButton type="submit">Add transform</PrimaryButton>
    </form>
  );
};
