import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, Checkbox, PrimaryButton, Select, FormLabel } from '../../../ui';
import { useOdataHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerStep } from '../../../types';
import { ODATA_BATCHES } from '../constants';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const OdataHandler: React.FC<HandlerStep> = (props) => {
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
  } = useOdataHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Base URL for an existing OData endpoint"
            required
            name="baseUrl"
            error={hasErrors('baseUrl')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Select}
            control={control}
            name="batch"
            options={ODATA_BATCHES}
            labelId="batch"
            label="Batch"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Metadata"
            name="metadata"
            error={hasErrors('metadata')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormLabel
            label="Expand navigation props (use for navigation props instead of seperate HTTP requests)"
            control={
              <Controller
                name="expandNavProps"
                control={control}
                defaultValue={false}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
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
      <ObjectArray
        title="Schema headers"
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
