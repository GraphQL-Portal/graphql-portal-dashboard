import React from 'react';

import { FormGroup, Input, OutlineButton, Select } from '../../../ui';
import { AddFieldArrayHeader } from '../../Form';
import { HandlerCol, HandlerRow } from '../Layout';
import { useStyles } from './useStyles';
import { METHOD_OPTIONS, TYPE_OPTIONS } from './constants';
import { Controller } from 'react-hook-form';

export const Operations: React.FC<any> = ({
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
      {operations.map((operation: any, idx: number) => (
        <FormGroup key={`operation-${idx}`} title="Operation">
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
              <Input
                ref={register()}
                label="Origin Path"
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
          <FormGroup title="Request schema">
            <HandlerRow>
              <HandlerCol>
                <Input
                  ref={register()}
                  label="Path to Request Schema"
                  name={`operations[${idx}].requestSchema`}
                  fullWidth
                  defaultValue={operation.requestSchema}
                  error={!!errors?.operations?.[idx]?.requestSchema}
                />
              </HandlerCol>
            </HandlerRow>
            <HandlerRow>
              <HandlerCol>
                <Input
                  ref={register()}
                  label="URL to Request Sample"
                  name={`operations[${idx}].requestSample`}
                  fullWidth
                  defaultValue={operation.requestSample}
                  error={!!errors?.operations?.[idx]?.requestSample}
                />
              </HandlerCol>
            </HandlerRow>
          </FormGroup>
          <FormGroup title="Response Schema">
            <HandlerRow>
              <HandlerCol>
                <Input
                  ref={register()}
                  label="URL of Response Schema"
                  name={`operations[${idx}].responseSchema`}
                  helperText="JSON Schema of the response"
                  required
                  fullWidth
                  defaultValue={operation.responseSchema}
                  error={!!errors?.operations?.[idx]?.responseSchema}
                />
              </HandlerCol>
            </HandlerRow>
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
