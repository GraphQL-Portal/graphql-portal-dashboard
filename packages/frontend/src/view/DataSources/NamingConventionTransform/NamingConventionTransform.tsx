import React from 'react';

import { OutlineButton, PrimaryButton, Select } from '../../../ui';
import { TransformStep as Props } from '../../../types';
import { useNamingConventionTransform } from '../../../presenter/DataSources';
import { HandlerCol, HandlerRow } from '../Layout';
import { useStyles } from './useStyles';
import { Controller } from 'react-hook-form';

const ENUM_OPTIONS = [
  {
    label: '-',
    value: '',
  },
  {
    label: 'camelCase',
    value: 'camelCase',
  },
  {
    label: 'capitalCase',
    value: 'capitalCase',
  },
  {
    label: 'constantCase',
    value: 'constantCase',
  },
  {
    label: 'dotCase',
    value: 'dotCase',
  },
  {
    label: 'dotCase',
    value: 'dotCase',
  },
  {
    label: 'headerCase',
    value: 'headerCase',
  },
  {
    label: 'noCase',
    value: 'noCase',
  },
  {
    label: 'paramCase',
    value: 'paramCase',
  },
  {
    label: 'pascalCase',
    value: 'pascalCase',
  },
  {
    label: 'pathCase',
    value: 'pathCase',
  },
  {
    label: 'sentenceCase',
    value: 'sentenceCase',
  },
  {
    label: 'sentenceCase',
    value: 'sentenceCase',
  },
  {
    label: 'upperCase',
    value: 'upperCase',
  },
  {
    label: 'lowerCase',
    value: 'lowerCase',
  },
];

export const NamingConventionTransform: React.FC<Props> = (props) => {
  const { onCancel } = props;
  const { onSubmit, control } = useNamingConventionTransform(props);
  const { cancelButton } = useStyles();

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Select}
            control={control}
            name="enumValues"
            options={ENUM_OPTIONS}
            labelId="enumValues"
            label="Enum Values"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Select}
            control={control}
            name="fieldNames"
            options={ENUM_OPTIONS}
            labelId="fieldNames"
            label="Field Names"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Select}
            control={control}
            name="typeNames"
            options={ENUM_OPTIONS}
            labelId="typeNames"
            label="Type Names"
            fullWidth
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
