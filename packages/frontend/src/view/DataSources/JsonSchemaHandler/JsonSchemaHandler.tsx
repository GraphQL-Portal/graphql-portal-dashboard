import React from 'react';

import { Checkbox, FormLabel, Input, PrimaryButton } from '../../../ui';
import { useJsonSchemaHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { Operations } from './Operations';
import { Controller } from 'react-hook-form';

export const JsonSchemaHandler: React.FC<HandlerStep> = (props) => {
  const {
    register,
    control,
    errors,
    onSubmit,
    schemaFields,
    appendSchemaField,
    removeSchemaField,
    operationFields,
    appendOperationField,
    removeOperationField,
    operations,
    addOperation,
    removeOperation,
  } = useJsonSchemaHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="URL to JsonSchema API"
            required
            name="baseUrl"
            error={!!errors?.baseUrl}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormLabel
            label="Ignore self-signed certificate error"
            control={
              <Controller
                name="rejectUnauthorized"
                control={control}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerCol>
      </HandlerRow>
      <Operations
        operations={operations}
        addOperation={addOperation}
        removeOperation={removeOperation}
        register={register}
        control={control}
        errors={errors}
      />
      <ObjectArray
        title="Schema Headers"
        name="schemaHeaders"
        register={register}
        errors={errors}
        fields={schemaFields}
        onAdd={appendSchemaField}
        onRemove={removeSchemaField}
      />
      <ObjectArray
        title="Operation Headers"
        name="operationHeaders"
        register={register}
        errors={errors}
        fields={operationFields}
        onAdd={appendOperationField}
        onRemove={removeOperationField}
      />
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
