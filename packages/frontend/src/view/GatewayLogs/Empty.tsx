import React from 'react';
import { Emoji, EmptyContainer, EmptyIcon, EmptyText } from '../../ui';

export const EmptyLogs: React.FC = () => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        You don't have any logs available yet...{' '}
        <Emoji label="loudly crying face">😭</Emoji>
      </EmptyText>
    </EmptyContainer>
  );
};
