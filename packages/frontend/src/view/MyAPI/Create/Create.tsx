import React from 'react';
import { Helmet } from 'react-helmet';

import {
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  TabsHead,
  TabsBody,
} from '../../../ui';
import { useTabs } from '../../../model/Hooks';
import { CREATE_NEW_API_TABS } from '../constants';
import { AddNewAPIHeader } from './Header';

export const CreateApi: React.FC = () => {
  const { tab, onChange } = useTabs();

  return (
    <>
      <Helmet>
        <title>Create a new API</title>
      </Helmet>
      <AddNewAPIHeader />
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Create a new API" />
          <WidgetBody>
            <TabsHead
              value={tab}
              onChange={onChange}
              tabsList={CREATE_NEW_API_TABS}
            />
            <TabsBody value={tab}>
              <div>1 child</div>
              <div>2 child</div>
              <div>3 child</div>
            </TabsBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
