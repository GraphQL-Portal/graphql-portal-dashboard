import React from 'react';

import { Col } from '../Grid';
import { Widget } from './Widget';

export const HugeWidget:React.FC = ({ children }) => {
  return <Col xs={12}><Widget>{children}</Widget></Col>;
}
