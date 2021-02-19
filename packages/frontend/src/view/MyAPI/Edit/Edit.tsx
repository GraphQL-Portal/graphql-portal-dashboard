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
import { EDIT_TABS } from '../constants';
import { GeneralTab } from './GeneralTab';
import { DataSourcesTab } from './DataSourcesTab';

export const EditApi: React.FC = () => {
  const { loading, data, tab, onChange, refetch } = useApiById();

  if (loading) return <Loading />;
  const { name } = data;
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
            <TabsHead value={tab} onChange={onChange} tabsList={EDIT_TABS} />
            <TabsBody value={tab}>
              <GeneralTab api={data} refetch={refetch!} />
              <DataSourcesTab api={data} refetch={refetch!} />
            </TabsBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
