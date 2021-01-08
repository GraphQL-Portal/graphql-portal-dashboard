import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import { ROUTES } from '../../../model/providers';
import { useAddDataSource } from '../../../presenter/DataSources';
import { WidgetRow, HugeWidget, WidgetHeader, WidgetBody } from '../../../ui';

export const AddDataSource:React.FC = () => {
  const { source } = useAddDataSource();

  if (!source) return <Redirect to={ROUTES.DATA_SOURCES} />

  return (
    <>
      <Helmet>
        <title>Add new connector</title>
      </Helmet>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Configure a data source" />
          <WidgetBody>Body will appear here</WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
