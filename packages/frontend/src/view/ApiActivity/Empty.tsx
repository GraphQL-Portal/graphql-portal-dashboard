import React from 'react';
import { Emoji, EmptyContainer, EmptyIcon, EmptyText } from '../../ui';

export const EmptyApiActivity: React.FC = () => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        There are no activity <Emoji label="loudly crying face">😭</Emoji>
      </EmptyText>
    </EmptyContainer>
  );
}
