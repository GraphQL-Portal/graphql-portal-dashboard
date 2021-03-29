import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, FormGroup } from '@material-ui/core';

import { Input, Checkbox, PrimaryButton, Select } from '../../../ui';
import { useThriftHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { THRIFT_PROTOCOLS } from '../constants';
import { getError } from '../helpers';

export const ThriftHandler: React.FC<HandlerStep> = (props) => {
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
  } = useThriftHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Host Name"
            required
            name="hostName"
            error={hasErrors('hostName')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Port"
            required
            name="port"
            error={hasErrors('port')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Service Name"
            required
            name="serviceName"
            error={hasErrors('serviceName')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="IDL"
            required
            name="idl"
            error={hasErrors('idl')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                label="Use HTTPS"
                control={
                  <Controller
                    name="https"
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
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Path"
            name="path"
            error={hasErrors('path')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Select}
            control={control}
            name="protocol"
            options={THRIFT_PROTOCOLS}
            labelId="protocol"
            label="Protocol"
            fullWidth
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
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
