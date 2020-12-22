import React from 'react';

import { Col } from '../Grid';
import { Widget } from './Widget';

export const BigWidget:React.FC = ({ children }) => {
  return <Col xs={12} md={9}><Widget>{children}</Widget></Col>;
}
