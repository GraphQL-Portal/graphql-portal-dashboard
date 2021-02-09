import React from 'react';

import {
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  TabsHead,
  TabsBody,
} from '../../../ui';
import { useTabs } from '../../../model/Hooks';

const TABS_ITEMS = [
  {
    label: 'Core Settings',
  },
  {
    label: 'Data Sources',
  },
];

export const CreateApi: React.FC = () => {
  const { tab, onChange } = useTabs();

  return (
    <WidgetRow>
      <HugeWidget>
        <WidgetHeader title="Create new API" />
        <WidgetBody>
          <TabsHead
            value={tab}
            onChange={onChange}
            variant="fullWidth"
            tabsList={TABS_ITEMS}
          />
          <TabsBody value={tab}>
            <div>1 child</div>
            <div>2 child</div>
          </TabsBody>
        </WidgetBody>
      </HugeWidget>
    </WidgetRow>
  );
};
