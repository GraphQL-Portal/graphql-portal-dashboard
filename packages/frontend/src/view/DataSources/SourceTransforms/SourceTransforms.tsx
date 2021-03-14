import React from 'react';

import { useTransforms } from '../../../presenter/DataSources';
import { TransformsStep, TransformsMapper } from '../../../types';
import { FormGroup } from '../../../ui';
import { TransformEditors } from '../TransformEditors';
import { PrefixTransform } from '../PrefixTransform';
import { RenameTransform } from '../RenameTransform';
import { AvailableTransforms } from './Available';

import { List } from './List';

// Put Transform Custom Forms here
const TRANSFORM_TABLE: TransformsMapper = {
  prefix: PrefixTransform,
  rename: RenameTransform,
};

const getTransform = (transform: string) =>
  TRANSFORM_TABLE[transform] || TransformEditors;

export const SourceTransforms: React.FC<TransformsStep> = (props) => {
  const {
    state,
    addTransform,
    transforms,
    fields,
    onAddTransform,
    onRemoveTransform,
    onRemove,
    onEdit,
    edited,
    onCancelEdit,
    onUpdateTransform,
  } = useTransforms(props);

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
      <AvailableTransforms transforms={transforms} onAdd={onAddTransform} />
    </>
  );
};
