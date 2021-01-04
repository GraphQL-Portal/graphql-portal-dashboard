import React from 'react';

import { EmptyContainer, EmptyIcon, EmptyText, Emoji } from '../../ui';

export const EmptyGatewayNodes:React.FC = () => {

  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        You don't have any active Gateway Nodes at the moment <Emoji label="loudly crying face">😭</Emoji>
      </EmptyText>
    </EmptyContainer>
  );
}
