import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

import { HeaderBackButton as Props } from '../../types';
import { H3 } from '../Typography';
import { useStyles } from './useStyles';

export const HeaderBackButton: React.FC<Props> = ({ to, title }) => {
  const { backButton } = useStyles();
  return (
    <Link to={to} className={backButton}>
      <ArrowBack />
      <H3>{title}</H3>
    </Link>
  );
};
