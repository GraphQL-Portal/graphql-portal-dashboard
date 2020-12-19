import React from 'react';

import { Header, HugeWidget, PrimaryButton, WidgetRow, WidgetHeader } from '../../ui';
import { useGatewayNodes } from '../../presenter/GatewayNodes';

export const GatewayNodes:React.FC = () => {
  const { data, onSyncClick } = useGatewayNodes();

  const title = (data && data.hello) || 'No data yet';

  return (
    <>
      <Header title="Active Gateway Nodes">
        <PrimaryButton onClick={onSyncClick}>Sync configuration</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title={title} />
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
