import React from 'react';
import { Helmet } from 'react-helmet';
import { ROUTES } from '../../../model/providers';

import {
  Header,
  HeaderBackButton,
  HugeWidget,
  TabsBody,
  TabsHead,
  WidgetBody,
  WidgetHeader,
  WidgetRow,
} from '../../../ui';
import { useViewAPI } from '../../../presenter/ApiDefs';
import { Playground } from './Playground';
import { Schema } from './Schema';

const TABS = [{ label: 'Playground' }, { label: 'Schema' }];

export const ViewAPI: React.FC = () => {
  const { tab, onChange } = useViewAPI();
  return (
    <>
      <Helmet>
        <title>Edit API</title>
      </Helmet>
      <Header
        startChildren={
          <HeaderBackButton to={ROUTES.APIS} title="Back to My API" />
        }
        title=""
      />
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title={`Edit API`} />
          <WidgetBody>
            <TabsHead value={tab} onChange={onChange} tabsList={TABS} />
            <TabsBody value={tab}>
              <Playground />
              <Schema />
            </TabsBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
