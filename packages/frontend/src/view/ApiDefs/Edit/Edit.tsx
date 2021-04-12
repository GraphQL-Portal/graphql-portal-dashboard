import React from 'react';
import { Helmet } from 'react-helmet';

import { useApiById } from '../../../presenter/ApiDefs';
import {
  WidgetRow,
  HugeWidget,
  TabsHead,
  TabsBody,
  WidgetBody,
} from '../../../ui';
import { Loading } from '../../Loading';
import { EDIT_TABS } from '../constants';
import { GeneralTab } from './GeneralTab';
import { DataSourcesTab } from './DataSourcesTab';
import { SchemaAndLimits } from './SchemaAndLimits';
import { IPTab } from './IPTab';
import { AdditionalResolversTab } from './AdditionalResolversTab';
import { CacheTab } from './CacheTab';
import { EditHeader } from './EditHeader';

export const EditApi: React.FC = () => {
  const { loading, api, tab, onChange, refetch, apiEndpoint } = useApiById();

  if (loading) return <Loading />;
  const { name } = api;
  return (
    <>
      <Helmet>
        <title>Edit {name} API</title>
      </Helmet>
      <EditHeader
        name={name}
        apiEndpoint={apiEndpoint}
        api={api}
        refetch={refetch!}
      />
      <WidgetRow>
        <HugeWidget>
          <WidgetBody>
            <TabsHead value={tab} onChange={onChange} tabsList={EDIT_TABS} />
            <TabsBody value={tab}>
              <GeneralTab api={api} refetch={refetch!} />
              <DataSourcesTab api={api} refetch={refetch!} />
              <SchemaAndLimits api={api} refetch={refetch!} />
              <IPTab api={api} refetch={refetch!} />
              <AdditionalResolversTab api={api} refetch={refetch!} />
              <CacheTab api={api} refetch={refetch!} />
            </TabsBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
