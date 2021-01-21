import React from 'react';
import { Select as MuiSelect, FormControl, InputLabel, MenuItem } from '@material-ui/core';

import { Select as Props } from './types';

export const Select:React.FC<Props> = ({ options, fullWidth, ...selectProps}) => {
  const { label, labelId } = selectProps;
  return (
    <FormControl fullWidth={fullWidth} variant="outlined">
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect {...selectProps}>
        {options.map(({ value, label }) => <MenuItem value={value}>{label}</MenuItem>)}
      </MuiSelect>
    </FormControl>
  );
}
