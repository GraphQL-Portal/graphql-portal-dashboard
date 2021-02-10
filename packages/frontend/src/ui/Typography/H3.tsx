import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export const H3: React.FC<TypographyProps> = (props) => {
  return <Typography variant="h3" {...props} />;
};
