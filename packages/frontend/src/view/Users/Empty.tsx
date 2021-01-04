import React from 'react';
import { Emoji, EmptyContainer, EmptyIcon, EmptyText } from '../../ui';

export const EmptyUsers:React.FC = () => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        There are no registered users <Emoji label="loudly crying face">😭</Emoji>
      </EmptyText>
    </EmptyContainer>
  );
}
