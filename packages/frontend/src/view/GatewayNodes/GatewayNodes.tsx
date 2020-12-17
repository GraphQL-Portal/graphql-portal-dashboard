import React from 'react';

import { Header, PrimaryButton } from '../../ui';

export const GatewayNodes:React.FC = () => {
  return (
    <>
      <Header title="Active Gateway Nodes">
        <PrimaryButton>Sync configuration</PrimaryButton>
      </Header>
    </>
  );
}
