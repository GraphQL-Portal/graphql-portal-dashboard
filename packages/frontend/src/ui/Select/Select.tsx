import React, { forwardRef } from 'react';
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

import { Select as Props } from '../../types';
import { getUuid } from '../../utils';

export const Select = forwardRef<unknown, Props>(
  ({ options, fullWidth, labelClassName, helperText, ...selectProps }, ref) => {
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
            <MenuItem value={value} key={getUuid()}>
              {label}
            </MenuItem>
          ))}
        </MuiSelect>
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);
