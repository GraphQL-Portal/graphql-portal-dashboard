import React from 'react';
import { Controller } from 'react-hook-form';

import {
  Checkbox,
  OutlineButton,
  PrimaryButton,
  Input,
  FormGroup,
  Tooltip,
  H6,
  FormLabel,
  IconButton,
} from '../../../ui';
import { TransformStep as Props } from '../../../types';
import { Add } from '../../../icons';
import { useRenameTransform } from '../../../presenter/DataSources';
import { HandlerRow, HandlerCol } from '../Layout';
import { useStyles } from './useStyles';

export const RenameTransform: React.FC<Props> = (props) => {
  const { cancelButton, titleCol, buttonCol } = useStyles();
  const { onCancel } = props;
  const {
    onSubmit,
    errors,
    control,
    register,
    items,
    onAdd,
    onRemove,
  } = useRenameTransform(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol className={titleCol}>
          <H6>Rename fields</H6>
        </HandlerCol>
        <HandlerCol className={buttonCol}>
          <Tooltip title={`Add renaming field`} placement="left">
            <IconButton onClick={onAdd}>
              <Add />
            </IconButton>
          </Tooltip>
        </HandlerCol>
      </HandlerRow>
      {items.map((item: any, idx: number) => (
        <FormGroup title="Rename item">
          <HandlerRow>
            <HandlerCol>
              <Input
                ref={register()}
                name={`items[${idx}].from.type`}
                error={!!errors?.items?.[idx]?.from?.type}
                label="From type name"
                fullWidth
                defaultValue={item?.from?.type || ''}
                required
              />
            </HandlerCol>
            <HandlerCol>
              <Input
                ref={register()}
                name={`items[${idx}].from.field`}
                error={!!errors?.items?.[idx]?.from?.field}
                label="From field name"
                defaultValue={item?.from?.field || ''}
                fullWidth
                required
              />
            </HandlerCol>
          </HandlerRow>
          <HandlerRow>
            <HandlerCol>
              <Input
                ref={register()}
                name={`items[${idx}].to.type`}
                error={!!errors?.items?.[idx]?.to?.type}
                label="To type name"
                defaultValue={item?.to?.type || ''}
                fullWidth
                required
              />
            </HandlerCol>
            <HandlerCol>
              <Input
                ref={register()}
                name={`items[${idx}].to.field`}
                error={!!errors?.items?.[idx]?.to?.field}
                label="To field name"
                defaultValue={item?.to?.field || ''}
                fullWidth
                required
              />
            </HandlerCol>
          </HandlerRow>
          <HandlerRow>
            <HandlerCol>
              <FormLabel
                label="Use Regular Expression for field names"
                control={
                  <Controller
                    name="useRegExpForFields"
                    control={control}
                    render={(props) => <Checkbox {...props} color="primary" />}
                  />
                }
              />
            </HandlerCol>
            <HandlerCol>
              <FormLabel
                label="Use Regular Expression for type names"
                control={
                  <Controller
                    name="useRegExpForTypes"
                    control={control}
                    render={(props) => <Checkbox {...props} color="primary" />}
                  />
                }
              />
            </HandlerCol>
          </HandlerRow>
          <HandlerRow>
            <HandlerCol>
              <OutlineButton onClick={() => onRemove(idx)}>
                Remove Rename field
              </OutlineButton>
            </HandlerCol>
          </HandlerRow>
        </FormGroup>
      ))}
      <OutlineButton onClick={onCancel} className={cancelButton}>
        Cancel
      </OutlineButton>
      <PrimaryButton type="submit">Add transform</PrimaryButton>
    </form>
  );
};
