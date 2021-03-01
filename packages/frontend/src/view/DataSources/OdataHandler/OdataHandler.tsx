import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, FormGroup } from '@material-ui/core';

import { Input, Checkbox, PrimaryButton, Select } from '../../../ui';
import { useOdataHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerStep } from '../../../types';
import { ODATA_BATCHES } from '../constants';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const OdataHandler: React.FC<HandlerStep> = (props) => {
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
  } = useOdataHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
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
          <Controller
            as={Input}
            control={control}
            label="Metadata"
            name="metadata"
            error={hasErrors('metadata')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormControl>
            <FormGroup>
              <FormControlLabel
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
            </FormGroup>
          </FormControl>
        </HandlerCol>
      </HandlerRow>
      <ObjectArray
        title="Schema headers"
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
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
