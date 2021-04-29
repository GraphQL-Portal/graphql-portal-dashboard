import React from 'react';
import { Controller } from 'react-hook-form';

import { JsonSchemaOperation, Operations as Props } from '../../../types';
import { FormGroup, Input, OutlineButton, Select } from '../../../ui';
import { AddFieldArrayHeader } from '../../Form';
import { HandlerCol, HandlerRow } from '../Layout';
import { useStyles } from './useStyles';
import { METHOD_OPTIONS, TYPE_OPTIONS } from './constants';
import { ArgsTypeMap } from './ArgsTypeMap';

export const Operations: React.FC<Props> = ({
  operations,
  addOperation,
  removeOperation,
  register,
  control,
  errors,
}) => {
  const { lastRow } = useStyles();
  return (
    <>
      <AddFieldArrayHeader
        title="Add API Operation"
        onAddClick={addOperation}
      />
      {operations.map((operation, idx: number) => (
        <FormGroup key={`operation-${idx}`} title="Operation">
          <HandlerRow>
            <HandlerCol>
              <Input
                ref={register()}
                label="Endpoint Path"
                helperText="Path of the endpoint in the origin API (for example, /user)"
                name={`operations[${idx}].path`}
                fullWidth
                defaultValue={operation.path}
                error={!!errors?.operations?.[idx]?.path}
              />
            </HandlerCol>
          </HandlerRow>
          <HandlerRow>
            <HandlerCol>
              <Controller
                as={Select}
                control={control}
                name={`operations[${idx}].type`}
                options={TYPE_OPTIONS}
                labelId="type"
                label="Target Type"
                fullWidth
                defaultValue={operation.type}
                helperText="Type of the operation in GraphQL"
              />
            </HandlerCol>
          </HandlerRow>
          <HandlerRow>
            <HandlerCol>
              <Input
                ref={register()}
                label="Target field name"
                name={`operations[${idx}].field`}
                helperText="Name of the field to be added to Target Type"
                fullWidth
                defaultValue={operation.field}
                error={!!errors?.operations?.[idx]?.field}
                required
              />
            </HandlerCol>
          </HandlerRow>
          <HandlerRow>
            <HandlerCol>
              <Controller
                as={Select}
                control={control}
                name={`operations[${idx}].method`}
                options={METHOD_OPTIONS}
                labelId="method"
                label="Origin HTTP Method"
                fullWidth
                defaultValue={operation.method}
                helperText="HTTP Method to be used in the request to the Origin path (i.e. GET to /user)"
              />
            </HandlerCol>
          </HandlerRow>
          <FormGroup title="Response Schema">
            <HandlerRow>
              <HandlerCol>
                <Input
                  ref={register()}
                  label="URL to Response sample"
                  name={`operations[${idx}].responseSample`}
                  fullWidth
                  defaultValue={operation.responseSample}
                  error={!!errors?.operations?.[idx]?.responseSample}
                />
              </HandlerCol>
            </HandlerRow>
          </FormGroup>
          <ArgsTypeMap
            name={`operations[${idx}].argTypeMap`}
            register={register}
            control={control}
            errors={errors}
          />
          <HandlerRow className={lastRow}>
            <HandlerCol>
              <OutlineButton onClick={removeOperation.bind(null, idx)}>
                Remove Operations Field
              </OutlineButton>
            </HandlerCol>
          </HandlerRow>
        </FormGroup>
      ))}
    </>
  );
};
