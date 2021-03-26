import React from 'react';
import { Col } from '../Grid';

import { Col as Props } from '../../types';
import { useStyles } from './useStyles';

export const HeaderContentCell: React.FC<Props> = (props) => {
  const { center } = useStyles();
  return <Col {...props} className={center} />;
};
