import React from 'react';

import { FormGroup, Input, OutlineButton, Select } from '../../../ui';
import { AddFieldArrayHeader } from '../../Form';
import { HandlerCol, HandlerRow } from '../Layout';
import { useStyles } from './useStyles';
import { METHOD_OPTIONS, TYPE_OPTIONS } from './constants';
import { Controller } from 'react-hook-form';
// import { HookFormJsonEditor } from '../../Editors';

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
      <AddFieldArrayHeader title="Add Operation" onAddClick={addOperation} />
      {operations.map((operation: any, idx: number) => (
        <FormGroup key={`operation-${idx}`} title="Operation">
          <HandlerRow>
            <HandlerCol>
              <Input
                ref={register()}
                label="Field name"
                name={`operations[${idx}].field`}
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
                label="Path"
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
                label="Operation Type"
                fullWidth
                defaultValue={operation.type}
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
                label="Operation Method"
                fullWidth
                defaultValue={operation.method}
              />
            </HandlerCol>
          </HandlerRow>
          <FormGroup title="Operation request">
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
            {/* <HandlerRow>
              <HandlerCol>
                <H6>Request sample</H6>
                <HookFormJsonEditor
                  className={editor}
                  control={control}
                  name={`operations[${idx}].requestSample`}
                  defaultValue={operation.requestSample || {}}
                />
              </HandlerCol>
            </HandlerRow> */}
            <HandlerRow>
              <HandlerCol>
                <Input
                  ref={register()}
                  label="Request Type Name"
                  name={`operations[${idx}].requestTypeName`}
                  fullWidth
                  defaultValue={operation.requestTypeName}
                  error={!!errors?.operations?.[idx]?.requestTypeName}
                />
              </HandlerCol>
            </HandlerRow>
          </FormGroup>
          <FormGroup title="Operation response">
            <HandlerRow>
              <HandlerCol>
                <Input
                  ref={register()}
                  label="Path to Response Schema"
                  name={`operations[${idx}].responseSchema`}
                  required
                  fullWidth
                  defaultValue={operation.responseSchema}
                  error={!!errors?.operations?.[idx]?.responseSchema}
                />
              </HandlerCol>
            </HandlerRow>
            {/* <HandlerRow>
              <HandlerCol>
                <H6>Response sample</H6>
                <HookFormJsonEditor
                  className={editor}
                  control={control}
                  name={`operations[${idx}].responseSample`}
                  defaultValue={operation.responseSample || {}}
                />
              </HandlerCol>
            </HandlerRow> */}
            <HandlerRow>
              <HandlerCol>
                <Input
                  ref={register()}
                  label="Response Type Name"
                  name={`operations[${idx}].responseTypeName`}
                  fullWidth
                  defaultValue={operation.responseTypeName}
                  error={!!errors?.operations?.[idx]?.responseTypeName}
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
