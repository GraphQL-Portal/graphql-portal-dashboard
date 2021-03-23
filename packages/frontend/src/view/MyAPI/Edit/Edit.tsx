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
  CopyToClipboard,
} from '../../../ui';
import { Loading } from '../../Loading';
import { EDIT_TABS } from '../constants';
import { EnableSwitch } from '../Form';
import { GeneralTab } from './GeneralTab';
import { DataSourcesTab } from './DataSourcesTab';
import { SchemaAndLimits } from './SchemaAndLimits';
import { IPTab } from './IPTab';
import { AdditionalResolversTab } from './AdditionalResolversTab';
import { FormControlLabel } from '@material-ui/core';

export const EditApi: React.FC = () => {
  const { loading, api, tab, onChange, refetch, apiEndpoint } = useApiById();

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
          <WidgetHeader title={`Edit ${name} API`}>
            <CopyToClipboard
              text={apiEndpoint}
              buttonText={apiEndpoint}
              message="Successfully copied to clipboard"
            />
            <FormControlLabel
              label="Active"
              labelPlacement="start"
              control={<EnableSwitch api={api} refetch={refetch!} />}
            />
          </WidgetHeader>
          <WidgetBody>
            <TabsHead value={tab} onChange={onChange} tabsList={EDIT_TABS} />
            <TabsBody value={tab}>
              <GeneralTab api={api} refetch={refetch!} />
              <DataSourcesTab api={api} refetch={refetch!} />
              <SchemaAndLimits api={api} refetch={refetch!} />
              <IPTab api={api} refetch={refetch!} />
              <AdditionalResolversTab api={api} refetch={refetch!} />
            </TabsBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
