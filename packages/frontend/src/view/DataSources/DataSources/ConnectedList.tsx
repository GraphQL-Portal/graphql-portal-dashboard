import React from 'react';

import { WidgetHeader, WidgetBody } from '../../../ui';

export const ConnectedList:React.FC = () => {
  return (
    <>
      <WidgetHeader title="My connected data-sources" />
      <WidgetBody>List of connected data-sources</WidgetBody>
    </>
  );
}
