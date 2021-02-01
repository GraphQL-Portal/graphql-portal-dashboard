import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export const Body1: React.FC<TypographyProps> = (props) => {
  return <Typography variant="body1" {...props} />;
};
