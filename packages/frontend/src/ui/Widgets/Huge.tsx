import React from 'react';

import { Col } from '../Grid';
import { Widget } from './Widget';

import { Widget as Props } from '../../types';

export const HugeWidget: React.FC<Props> = ({ children, className }) => {
  return (
    <Col xs={12}>
      <Widget className={className}>{children}</Widget>
    </Col>
  );
};
