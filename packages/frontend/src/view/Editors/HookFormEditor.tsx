import React from 'react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { RecordStringAny as Props } from '../../types';

import { JsonEditor } from './Editor';
import { useStyles } from './useStyles';

export const HookFormJsonEditor: React.FC<Props> = ({
  control,
  name,
  source,
  className,
  ...controllerProps
}) => {
  const { code } = useStyles();
  return (
    <Controller
      control={control}
      name={name}
      render={(props) => (
        <JsonEditor
          className={clsx(code, className)}
          schema={source}
          {...props}
        />
      )}
      {...controllerProps}
    />
  );
};
