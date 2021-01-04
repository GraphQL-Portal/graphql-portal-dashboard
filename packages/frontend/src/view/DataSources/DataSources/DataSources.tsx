import React from 'react';
import { Helmet } from 'react-helmet';

import { Header, HugeWidget, WidgetBody, WidgetHeader, WidgetRow } from '../../../ui';

import { useDataSources  } from '../../../presenter/DataSources';
import { Loading } from '../../Loading';
import { AvailableList } from './AvailableList';
import { EmptySources } from './Empty';
import { ConnectedList } from './ConnectedList';

export const DataSources:React.FC = () => {
  const { loading, connected } = useDataSources();

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Your Data Sources</title>
      </Helmet>
      <Header title="My Data Sources" />
      <WidgetRow>
        <HugeWidget>
          {connected.length === 0 ? <EmptySources /> : <ConnectedList />}
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Search available data connectors" />
          <WidgetBody>
            <AvailableList />
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
