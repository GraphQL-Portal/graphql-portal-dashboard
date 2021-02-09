import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { ApiActivity } from '..';
import { Header, WidgetRow, TabPanel } from '../../ui';
import { useStyles } from './useStyles';

export const MetricsAndLogs: React.FC = () => {
  const [tab, setTab] = React.useState(0);
  const { tabPanel, appBar } = useStyles();

  return (
    <>
      <Helmet>
        <title>Metrics and Logs</title>
      </Helmet>
      <Header title="Metrics and Logs" />
      <WidgetRow>
        <AppBar className={appBar}>
          <Tabs value={tab} indicatorColor='primary' onChange={(e, tab) => setTab(tab)}>
            <Tab label="APIs Activity" />
          </Tabs>
        </AppBar>
        <TabPanel className={tabPanel} value={tab} index={0}>
          <ApiActivity />
        </TabPanel>
      </WidgetRow>
    </>
  );
};
