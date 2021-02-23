import React, { forwardRef } from 'react';
import { Checkbox as MUICheckbox } from '@material-ui/core';

import { Checkbox as Props } from '../../types';

export const Checkbox = forwardRef<unknown, Props>(
  ({ onChange, value, ...params }, ref) => {
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
      onChange(evt.target.checked);

    return (
      <MUICheckbox
        onChange={handleChange}
        checked={value || false}
        {...params}
        innerRef={ref}
      />
    );
  }
);
