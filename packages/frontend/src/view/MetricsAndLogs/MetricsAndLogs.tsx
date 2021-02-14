import React from 'react';
import { Helmet } from 'react-helmet';

import { ApiActivity } from '..';
import { Header, WidgetRow, TabsBody, TabsHead } from '../../ui';
import { useTabs } from '../../model/Hooks';

const TABS = [{ label: ' APIs Activity' }];

export const MetricsAndLogs: React.FC = () => {
  const { tab, onChange } = useTabs();

  return (
    <>
      <Helmet>
        <title>Metrics and Logs</title>
      </Helmet>
      <Header title="Metrics and Logs" />
      <WidgetRow>
        <TabsHead
          tabsList={TABS}
          indicatorColor="primary"
          onChange={onChange}
          value={tab}
        />
        <TabsBody value={tab}>
          <ApiActivity />
        </TabsBody>
      </WidgetRow>
    </>
  );
};
