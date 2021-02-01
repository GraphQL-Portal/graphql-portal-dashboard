import React from 'react';
import { Controller } from 'react-hook-form';

import { useTransforms } from '../../../presenter/DataSources';
import { TransformsStep, TransformsMapper } from '../../../types';
import { Select, OutlineButton } from '../../../ui';
import { HandlerRow, HandlerCol } from '../Layout';
import { TransformEditors } from '../TransformEditors';

import { List } from './List';
import { useStyles } from './useStyles';

// Put Transform Form here
const TRANSFORM_TABLE: TransformsMapper = {};

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
  } = useTransforms(props);
  const { transformBlock, transformBlockTitle, addButton } = useStyles();

  console.log('IT WILL BE A TABLE FROM: ', state);

  return (
    <>
      <List transforms={state.transforms} />
      <form noValidate autoComplete="off" onSubmit={onAddTransform}>
        <HandlerRow>
          <HandlerCol>
            <Controller
              as={Select}
              control={control}
              name="transform"
              options={transforms}
              labelId="transform"
              label="Choose transform to add"
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
          <fieldset className={transformBlock}>
            <legend className={transformBlockTitle}>{field}</legend>
            <Handler
              key={`${field}-${idx}`}
              type={field}
              onCancel={onRemoveTransform(idx)}
              onSuccess={addTransform}
            />
          </fieldset>
        );
      })}
    </>
  );
};
