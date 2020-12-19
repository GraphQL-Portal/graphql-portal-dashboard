import React from 'react';
import { Helmet } from 'react-helmet';

import { Header, HugeWidget, PrimaryButton, WidgetRow, WidgetHeader } from '../../ui';
import { useGatewayNodes } from '../../presenter/GatewayNodes';

export const GatewayNodes:React.FC = () => {
  const { data, onSyncClick } = useGatewayNodes();

  const title = (data && data.hello) || 'No data yet';

  return (
    <>
      <Helmet>
        <title>Gateway Nodes</title>
      </Helmet>
      <Header title="Active Gateway Nodes">
        <PrimaryButton onClick={onSyncClick}>Sync configuration</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title={title} tooltip="test tooltip to display near the title"/>
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
