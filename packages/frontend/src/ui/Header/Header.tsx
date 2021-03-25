import React from 'react';

import { H3 } from '../Typography';
import { Header as Props } from '../../types';
import { HeaderWrapper } from './HeaderWrapper';
import { HeaderStartCell } from './HeaderStartCell';
import { HeaderEndCell } from './HeaderEndCell';

export const Header: React.FC<Props> = ({ title, children, startChildren }) => {
  return (
    <HeaderWrapper>
      <HeaderStartCell xs={6}>
        {startChildren || null}
        <H3>{title}</H3>
      </HeaderStartCell>
      <HeaderEndCell xs={6}>{children}</HeaderEndCell>
    </HeaderWrapper>
  );
};
