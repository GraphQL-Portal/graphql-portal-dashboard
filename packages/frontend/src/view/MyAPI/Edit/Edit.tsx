import React from 'react';
import { Helmet } from 'react-helmet';

import { useApiById } from '../../../presenter/ApiDefs';
import { Header, WidgetRow, HugeWidget, TabsHead, TabsBody } from '../../../ui';
import { Loading } from '../../Loading';
import { GeneralTab } from './GeneralTab';
import { DataSourcesTab } from './DataSourcesTab';

const TABS = [{ label: 'General' }, { label: 'Data Sources' }];

export const EditApi: React.FC = () => {
  const { loading, api, tab, onTabChange } = useApiById();
  console.log('API IS: ', api);

  if (loading) return <Loading />;
  const { name } = api;
  return (
    <>
      <Helmet>
        <title>Edit {name} API</title>
      </Helmet>
      <Header title={`Edit ${name} API`} />
      <WidgetRow>
        <HugeWidget>
          <TabsHead value={tab} onChange={onTabChange} tabsList={TABS} />
          <TabsBody value={tab}>
            <GeneralTab api={api} />
            <DataSourcesTab api={api} />
          </TabsBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
