import React from 'react';
import { Helmet } from 'react-helmet';

import { useApiById } from '../../../presenter/ApiDefs';
import { ROUTES } from '../../../model/providers';
import {
  Header,
  HeaderBackButton,
  WidgetRow,
  HugeWidget,
  TabsHead,
  TabsBody,
  WidgetBody,
  WidgetHeader,
} from '../../../ui';
import { Loading } from '../../Loading';
import { GeneralTab } from './GeneralTab';
import { DataSourcesTab } from './DataSourcesTab';

const TABS = [{ label: 'General' }, { label: 'Data Sources' }];

export const EditApi: React.FC = () => {
  const { loading, api, tab, onTabChange, refetch } = useApiById();

  if (loading) return <Loading />;
  const { name } = api;
  return (
    <>
      <Helmet>
        <title>Edit {name} API</title>
      </Helmet>
      <Header
        startChildren={
          <HeaderBackButton to={ROUTES.APIS} title="Back to My API" />
        }
        title=""
      />
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title={`Edit ${name} API`} />
          <WidgetBody>
            <TabsHead value={tab} onChange={onTabChange} tabsList={TABS} />
            <TabsBody value={tab}>
              <GeneralTab api={api} refetch={refetch} />
              <DataSourcesTab api={api} refetch={refetch} />
            </TabsBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
