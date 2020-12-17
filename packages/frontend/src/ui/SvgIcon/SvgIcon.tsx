import React from 'react';
import { SvgIcon as MuiIcon, SvgIconProps } from '@material-ui/core'

import { useStyles } from './useStyles';

export const SvgIcon:React.FC<SvgIconProps> = (props) => {
  const { icon } = useStyles();

  return (<MuiIcon className={icon} {...props} />);
}
