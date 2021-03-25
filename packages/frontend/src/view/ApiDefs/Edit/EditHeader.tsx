import { FormControlLabel } from '@material-ui/core';
import React from 'react';

import { ROUTES } from '../../../model/providers';
import {
  H3,
  HeaderContentCell,
  HeaderEndCell,
  HeaderStartCell,
  HeaderWrapper,
  CopyToClipboard,
  HeaderBackButton,
} from '../../../ui';
import { EditApiHeader as Props } from '../../../types';
import { EnableSwitch } from '../Form';

import { useStyles } from './useStyles';

export const EditHeader: React.FC<Props> = ({
  name,
  apiEndpoint,
  api,
  refetch,
}) => {
  const { copyButton } = useStyles();

  return (
    <HeaderWrapper>
      <HeaderStartCell xs={2}>
        <HeaderBackButton to={ROUTES.APIS} title="My APIs" />
      </HeaderStartCell>
      <HeaderContentCell xs={8}>
        <H3>{name}</H3>
        <CopyToClipboard
          text={apiEndpoint}
          buttonText={apiEndpoint}
          message="Successfully copied to clipboard"
          className={copyButton}
        />
      </HeaderContentCell>
      <HeaderEndCell xs={2}>
        <FormControlLabel
          label="Active"
          labelPlacement="start"
          control={<EnableSwitch api={api} refetch={refetch!} />}
        />
      </HeaderEndCell>
    </HeaderWrapper>
  );
};
