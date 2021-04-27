import React from 'react';
import { Controller } from 'react-hook-form';

import { HandlerStep } from '../../../types';
import { Input, PrimaryButton, Select, Checkbox, FormLabel } from '../../../ui';
import { useOpenapiHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerRow, HandlerCol, HandlerColBig } from '../Layout';
import { OPENAPI_SOURCE_FORMAT } from '../constants';
import { SelectQueryOrMutationFieldConfig } from './SelectQueryOrMutationFieldConfig';
import { selectors } from '../../Tour';

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
    disableInputs,
  } = useOpenapiHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            name="source"
            error={!!errors?.source}
            label="URL of the source OpenAPI json or yaml (Swagger) file."
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
            disabled={disableInputs}
            label="Format of the source file"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            name="baseUrl"
            error={!!errors?.baseUrl}
            label="Base URL"
            fullWidth
            helperText="Used to manually specify the base URL which all paths will be built on. Overrides server object of the OAS."
          />
        </HandlerCol>
      </HandlerRow>
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
      <ObjectArray
        title="Query Search Parameters"
        name="qs"
        register={register}
        errors={errors}
        fields={qsFields}
        onAdd={appendQSField}
        onRemove={removeQSField}
      />
      <SelectQueryOrMutationFieldConfig
        name="selectQueryOrMutationField"
        register={register}
        control={control}
        errors={errors}
        queryOrMutationFields={queryOrMutationFields}
        addQueryOrMutationField={addQueryOrMutationField}
        removeQueryOrMutationField={removeQueryOrMutationField}
      />
      <HandlerRow>
        <HandlerCol>
          <FormLabel
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
          <FormLabel
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
          <FormLabel
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
      <PrimaryButton
        data-tour={selectors.DATA_SOURCE_HANDLER_SAVE_BUTTON}
        type="submit"
      >
        Save Openapi Handler
      </PrimaryButton>
    </form>
  );
};
