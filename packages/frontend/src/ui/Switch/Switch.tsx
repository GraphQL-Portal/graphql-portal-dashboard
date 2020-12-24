import React from 'react';
import { Switch as MuiSwitch } from '@material-ui/core';

import { useStyles } from './useStyles';
import { Switch as Type } from './types';

export const Switch: React.FC<Type> = ({
  onChange,
  value,
  ...switchProps
}) => {
  const { focusVisible, ...classes } = useStyles();
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    onChange(evt.target.checked);

  return (
    <MuiSwitch
      classes={classes}
      focusVisibleClassName={focusVisible}
      disableRipple
      {...switchProps}
      onChange={handleChange}
      checked={value}
    />
  );
};
