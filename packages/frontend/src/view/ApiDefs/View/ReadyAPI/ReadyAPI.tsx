import React from 'react';
import { WidgetBody, TabsHead, TabsBody } from '../../../../ui';
import { VIEW_TABS } from '../../constants';
import { Schema } from './Schema';
import { Playground } from './Playground';
import { ReadyAPI as Props } from '../../../../types';

export const ReadyAPI: React.FC<Props> = ({ tab, onChange, fetcher, name }) => {
  return (
    <WidgetBody>
      <TabsHead value={tab} onChange={onChange} tabsList={VIEW_TABS} />
      <TabsBody value={tab}>
        <Playground fetcher={fetcher} name={name} />
        <Schema fetcher={fetcher} />
      </TabsBody>
    </WidgetBody>
  );
};
