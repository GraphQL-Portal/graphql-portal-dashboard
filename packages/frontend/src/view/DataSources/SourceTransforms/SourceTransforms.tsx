import React from 'react';
import { Controller } from 'react-hook-form';

import { useTransforms } from '../../../presenter/DataSources';
import { TransformsStep, TransformsMapper } from '../../../types';
import { Select, OutlineButton, FormGroup } from '../../../ui';
import { HandlerRow, HandlerCol } from '../Layout';
import { TransformEditors } from '../TransformEditors';
import { PrefixTransform } from '../PrefixTransform';

import { List } from './List';
import { useStyles } from './useStyles';

// Put Transform Custom Forms here
const TRANSFORM_TABLE: TransformsMapper = {
  prefix: PrefixTransform,
};

const getTransform = (transform: string) =>
  TRANSFORM_TABLE[transform] || TransformEditors;

export const SourceTransforms: React.FC<TransformsStep> = (props) => {
  const {
    state,
    addTransform,
    transforms,
    control,
    fields,
    onAddTransform,
    onRemoveTransform,
    onRemove,
    onEdit,
    edited,
    onCancelEdit,
    onUpdateTransform,
  } = useTransforms(props);
  const { addButton } = useStyles();

  return (
    <>
      <List transforms={state.transforms} onRemove={onRemove} onEdit={onEdit} />
      {Object.keys(edited).map((key) => {
        const transform = edited[key];
        const { name } = transform;
        const Handler = getTransform(name);
        return (
          <FormGroup title={name} key={`${name}-${key}`}>
            <Handler
              type={name}
              onCancel={onCancelEdit(key)}
              onSuccess={onUpdateTransform(Number(key))}
              value={transform[name]}
            />
          </FormGroup>
        );
      })}
      <form noValidate autoComplete="off" onSubmit={onAddTransform}>
        <HandlerRow>
          <HandlerCol>
            <Controller
              as={Select}
              control={control}
              name="transform"
              options={transforms}
              labelId="transform"
              label="Select a transform"
              fullWidth
            />
          </HandlerCol>
          <HandlerCol>
            <OutlineButton type="submit" className={addButton}>
              Add transform
            </OutlineButton>
          </HandlerCol>
        </HandlerRow>
      </form>
      {fields.map((field, idx) => {
        const Handler = getTransform(field);
        return (
          <FormGroup title={field} key={`${field}-${idx}`}>
            <Handler
              type={field}
              onCancel={onRemoveTransform(idx)}
              onSuccess={addTransform}
            />
          </FormGroup>
        );
      })}
    </>
  );
};
