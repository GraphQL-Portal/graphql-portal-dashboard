import React from 'react';
import { Emoji, EmptyContainer, EmptyIcon, EmptyText } from '../../../ui';

export const EmptyApiDefs: React.FC = () => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        You don't have any API's at the moment{' '}
        <Emoji label="loudly crying face">😭</Emoji>
      </EmptyText>
    </EmptyContainer>
  );
};
