import React from 'react';

import { Header, HugeWidget, PrimaryButton, WidgetRow } from '../../ui';
import { useGatewayNodes } from '../../presenter/GatewayNodes';

import { useStyles } from './useStyles';

export const GatewayNodes:React.FC = () => {
  const { data, onSyncClick } = useGatewayNodes();
  const { body } = useStyles();

  return (
    <>
      <Header title="Active Gateway Nodes">
        <PrimaryButton onClick={onSyncClick}>Sync configuration</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          <div className={body}>{(data && data.hello) || 'No data yet'}</div>
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
