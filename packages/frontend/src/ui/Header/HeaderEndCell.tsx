import React from 'react';
import { Col } from '../Grid';

import { Col as Props } from '../../types';
import { useStyles } from './useStyles';

export const HeaderEndCell: React.FC<Props> = (props) => {
  const { end } = useStyles();
  return <Col {...props} className={end} />;
};
