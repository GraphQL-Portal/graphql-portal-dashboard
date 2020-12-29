import React from 'react';
import { Helmet } from 'react-helmet';

import { Header, HugeWidget, WidgetBody, WidgetHeader, WidgetRow } from '../../ui';

import { useDataSources  } from '../../presenter/DataSources';

import { AvailableList } from './AvailableList';

export const DataSources:React.FC = () => {
  const { available } = useDataSources();

  return (
    <>
      <Helmet>
        <title>Your Data Sources</title>
      </Helmet>
      <Header title="My Data Sources" />
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="My connected data-sources" />
          <WidgetBody>
            List of data sources or empty state
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Search available data connectors" />
          <WidgetBody>
            <AvailableList list={available}/>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
