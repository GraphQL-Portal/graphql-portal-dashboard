import React from 'react';
import { Controller } from 'react-hook-form';

import { ErrorsAndControl as Props } from '../../../../types';
import { Input } from '../../../../ui';
import { useGraphQLHandler } from '../../../../presenter/DataSources';
import { ObjectArray } from '../../../Form';

const getError = (errors: any) => (field: string) =>
  !!(errors && errors[field]);

export const GraphQLHandler: React.FC<Props> = () => {
  const {
    control,
    errors,
    onSubmit,
    schemaFields,
    appendSchemaField,
    removeSchemaField,
    operationFields,
    appendOperationField,
    removeOperationField,
  } = useGraphQLHandler();
  const hasErrors = getError(errors);
  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Controller
        as={Input}
        control={control}
        label="endpoint"
        name="endpoint"
        error={hasErrors('endpoint')}
      />
      <ObjectArray
        title="Schema Headers"
        name="schemaHeaders"
        control={control}
        errors={errors}
        fields={schemaFields}
        onAdd={appendSchemaField}
        onRemove={removeSchemaField}
      />
      <ObjectArray
        title="Operation Headers"
        name="operationHeaders"
        control={control}
        errors={errors}
        fields={operationFields}
        onAdd={appendOperationField}
        onRemove={removeOperationField}
      />
    </form>
  );
};
