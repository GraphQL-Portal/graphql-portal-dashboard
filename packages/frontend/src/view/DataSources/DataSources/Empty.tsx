import React from 'react';
import { Emoji, EmptyContainer, EmptyIcon, EmptyText } from '../../../ui';

export const EmptySources: React.FC = () => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        You don’t have any connected data-sources yet. You can start by adding a
        new one using one of our connectors. Just select one from the list below{' '}
        <Emoji label="backhand index pointing down">👇</Emoji>
      </EmptyText>
    </EmptyContainer>
  );
};
