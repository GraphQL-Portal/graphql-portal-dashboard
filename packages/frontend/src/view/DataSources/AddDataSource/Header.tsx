import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

import { Header, H3 } from '../../../ui';
import { ROUTES } from '../../../model/providers';
import { useStyles } from './useStyles';

export const AddDataSourceHeader: React.FC = () => {
  const { backButton } = useStyles({});
  return (
    <Header
      startChildren={
        <Link to={ROUTES.DATA_SOURCES} className={backButton}>
          <ArrowBack />
          <H3>Back to data-sources</H3>
        </Link>
      }
      title=""
    />
  );
};
