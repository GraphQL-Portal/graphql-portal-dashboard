import React from 'react';
import { WidgetBody, HugeWidget, Header } from '../../ui';
import { useGatewayLogs } from '../../presenter/GatewayLogs';
import { EmptyLogs } from './Empty';
import { LogsTable } from './LogsTable/LogsTable';
import { Loading } from '../Loading';

export const GatewayLogs: React.FC = () => {
  const { data, loading } = useGatewayLogs();

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Gateway Logs" />
      <HugeWidget>
        <WidgetBody>
          {data.length ? <LogsTable logs={data} /> : <EmptyLogs />}
        </WidgetBody>
      </HugeWidget>
    </>
  );
};
