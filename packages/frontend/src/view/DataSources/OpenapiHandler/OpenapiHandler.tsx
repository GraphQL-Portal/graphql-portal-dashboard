import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';

import { HandlerStep } from '../../../types';
import { Input, PrimaryButton, Select, Checkbox } from '../../../ui';
import { useOpenapiHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerRow, HandlerCol, HandlerColBig } from '../Layout';
import { OPENAPI_SOURCE_FORMAT } from '../constants';
import { SelectQueryOrMutationFieldConfig } from './SelectQueryOrMutationFieldConfig';

export const OpenapiHandler: React.FC<HandlerStep> = (props) => {
  const {
    onSubmit,
    register,
    errors,
    control,
    schemaFields,
    appendSchemaField,
    removeSchemaField,
    operationFields,
    appendOperationField,
    removeOperationField,
    qsFields,
    appendQSField,
    removeQSField,
    queryOrMutationFields,
    addQueryOrMutationField,
    removeQueryOrMutationField,
  } = useOpenapiHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            name="source"
            error={!!errors?.source}
            label="Source"
            fullWidth
            required
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Select}
            control={control}
            name="sourceFormat"
            options={OPENAPI_SOURCE_FORMAT}
            labelId="sourceFormat"
            label="Source Format"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
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
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            name="baseUrl"
            error={!!errors?.baseUrl}
            label="Base URL"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <ObjectArray
        title="Query Search Parameters"
        name="qs"
        control={control}
        errors={errors}
        fields={qsFields}
        onAdd={appendQSField}
        onRemove={removeQSField}
      />
      <HandlerRow>
        <HandlerCol>
          <FormControlLabel
            label="Include HTTP Response details to the result object"
            control={
              <Controller
                name="includeHttpDetails"
                control={control}
                defaultValue={false}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerColBig>
          <FormControlLabel
            label="Auto-generate a 'limit' argument for all fields that return lists of objects, including ones produced by links"
            control={
              <Controller
                name="addLimitArgument"
                control={control}
                defaultValue={false}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerColBig>
      </HandlerRow>
      <HandlerRow>
        <HandlerColBig>
          <FormControlLabel
            label="Set argument name for mutation payload to 'requestBody'. If false, name defaults to camelCased pathname"
            control={
              <Controller
                name="genericPayloadArgName"
                control={control}
                defaultValue={false}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerColBig>
      </HandlerRow>
      <SelectQueryOrMutationFieldConfig
        name="selectQueryOrMutationField"
        register={register}
        control={control}
        errors={errors}
        queryOrMutationFields={queryOrMutationFields}
        addQueryOrMutationField={addQueryOrMutationField}
        removeQueryOrMutationField={removeQueryOrMutationField}
      />
      <PrimaryButton type="submit">Save Openapi Handler</PrimaryButton>
    </form>
  );
};
