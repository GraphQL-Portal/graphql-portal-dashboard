import React from 'react';
import { Emoji, EmptyContainer, EmptyIcon, EmptyText } from '../../ui';

export const EmptyApiActivity: React.FC = () => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        You don't have any metrics available yet...{' '}
        <Emoji label="loudly crying face">😭</Emoji>
      </EmptyText>
    </EmptyContainer>
  );
};
