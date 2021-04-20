import React from 'react';
import clsx from 'clsx';

import { Editors as Props } from '../../types';
import { H6 } from '../../ui';
import { HandlerRow, HandlerCol } from '../DataSources/Layout';
import { JsonEditor } from './Editor';
import { useStyles } from './useStyles';
import { HookFormJsonEditor } from './HookFormEditor';

export const Editors: React.FC<Props> = ({
  control,
  source,
  errors,
  title,
  name,
}) => {
  const { schema, editorErrorHeader } = useStyles();

  const editorConnectorHeader = clsx(!!errors?.handler && editorErrorHeader);

  return (
    <>
      <HandlerRow>
        <HandlerCol>
          <H6 className={editorConnectorHeader}>{`${title} config:`}</H6>
        </HandlerCol>
        <HandlerCol>
          <H6>{`${title} schema:`}</H6>
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <HookFormJsonEditor control={control} name={name} source={source} />
        </HandlerCol>
        <HandlerCol>
          <JsonEditor
            value={source}
            name={`${title} schema:`}
            className={schema}
            mode="view"
          />
        </HandlerCol>
      </HandlerRow>
    </>
  );
};
