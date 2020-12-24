import React from 'react';
import { Helmet } from 'react-helmet';

import {
  Header,
  HugeWidget,
  PrimaryButton,
  WidgetRow,
} from '../../ui';
import { useGatewayNodes } from '../../presenter/GatewayNodes';

import { EmptyGatewayNodes } from './Empty';
import { GatewayNodesList } from './List';
import { useStyles } from './useStyles';
import { Loading } from '../Loading';

export const GatewayNodes:React.FC = () => {
  const { data, onSyncClick, timestamp, loading } = useGatewayNodes();
  const { config } = useStyles();

  if (loading) return <Loading />

  return (
    <>
      <Helmet>
        <title>Gateway Nodes</title>
      </Helmet>
      <Header title="Active Gateway Nodes">
        {timestamp !== 0 && (
          <p className={config}>
            <span>Config version:</span> {timestamp}
          </p>
        )}
        <PrimaryButton onClick={onSyncClick}>Sync configuration</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          {data.length === 0 ? <EmptyGatewayNodes /> : <GatewayNodesList list={data} />}
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
