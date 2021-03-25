import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowBack } from '../../icons';
import { HeaderBackButton as Props } from '../../types';
import { H6 } from '../Typography';
import { useStyles } from './useStyles';

export const HeaderBackButton: React.FC<Props> = ({ to, title }) => {
  const { backButton } = useStyles();
  return (
    <H6>
      <Link to={to} className={backButton}>
        <ArrowBack />
        {title}
      </Link>
    </H6>
  );
};
