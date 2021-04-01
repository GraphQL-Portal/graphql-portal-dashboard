import React, { forwardRef } from 'react';
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

import { Select as Props } from '../../types';
import { getKeyFromText } from '../../utils';

export const Select = forwardRef<unknown, Props>(
  ({ options, fullWidth, labelClassName, ...selectProps }, ref) => {
    const { label, labelId } = selectProps;
    return (
      <FormControl fullWidth={fullWidth} variant="outlined">
        {label && (
          <InputLabel id={labelId} className={labelClassName}>
            {label}
          </InputLabel>
        )}
        <MuiSelect {...selectProps} ref={ref}>
          {options.map(({ value, label }) => (
            <MenuItem value={value} key={getKeyFromText(`${value}`)}>
              {label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    );
  }
);
