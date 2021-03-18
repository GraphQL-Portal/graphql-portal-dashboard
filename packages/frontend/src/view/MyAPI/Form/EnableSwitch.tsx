import React from 'react';

import { Switch } from '../../../ui';
import { EnableSwitch as Props } from '../../../types';
import { useEnableSwitch } from '../../../presenter/ApiDefs';

export const EnableSwitch: React.FC<Props> = props => {
  const { value, onChange, disabled } = useEnableSwitch(props);

  return <Switch onChange={onChange} value={value} disabled={disabled} />;
};
