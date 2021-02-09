import React from 'react';

import { Header, HeaderBackButton } from '../../../ui';
import { ROUTES } from '../../../model/providers';

export const AddNewAPIHeader: React.FC = () => {
  return (
    <Header
      startChildren={
        <HeaderBackButton to={ROUTES.APIS} title="Back to My API" />
      }
      title=""
    />
  );
};
