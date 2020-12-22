import React from 'react';

import { Col } from '../Grid';
import { Widget } from './Widget';

export const SmallWidget: React.FC = ({ children }) => {
  return (
    <Col xs={12} md={3}>
      <Widget>{children}</Widget>
    </Col>
  );
};
