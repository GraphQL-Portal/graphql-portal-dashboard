import React from 'react';
import { Controller } from 'react-hook-form';

import { FormGroup, Input, Select, OutlineButton } from '../../../ui';
import { SelectQueryOrMutationFieldConfig as Props } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { QUERY_OR_MUTATION_FIELD } from '../constants';
import { AddFieldArrayHeader } from '../../Form';

const TITLE = 'Query or Mutation Field Config';

export const SelectQueryOrMutationFieldConfig: React.FC<Props> = ({
  name,
  register,
  control,
  errors,
  queryOrMutationFields,
  addQueryOrMutationField,
  removeQueryOrMutationField,
}) => {
  return (
    <>
      <AddFieldArrayHeader title={TITLE} onAddClick={addQueryOrMutationField} />
      {queryOrMutationFields.map((field: any, idx: number) => (
        <FormGroup title="Field config" key={`${name}-${idx}`}>
          <HandlerRow>
            <HandlerCol>
              <Input
                ref={register()}
                name={`${name}[${idx}].title`}
                error={!!errors?.[name]?.[idx]?.title}
                label="OAS Title"
                fullWidth
                defaultValue={field.title || null}
              />
            </HandlerCol>
            <HandlerCol>
              <Input
                ref={register()}
                name={`${name}[${idx}].path`}
                error={!!errors?.[name]?.[idx]?.path}
                label="Operation Path"
                fullWidth
                defaultValue={field.path || null}
              />
            </HandlerCol>
          </HandlerRow>
          <HandlerRow>
            <HandlerCol>
              <Controller
                as={Select}
                control={control}
                name={`${name}[${idx}].type`}
                options={QUERY_OR_MUTATION_FIELD}
                labelId={`${name}[${idx}].type`}
                label="Target Root Type for this operation"
                fullWidth
                defaultValue={field.type === 'click' ? 'Query' : field.type}
              />
            </HandlerCol>
            <HandlerCol>
              <Input
                ref={register()}
                name={`${name}[${idx}].method`}
                error={!!errors?.[name]?.[idx]?.method}
                label="Method"
                fullWidth
                defaultValue={field.method || null}
              />
            </HandlerCol>
          </HandlerRow>
          <HandlerRow>
            <HandlerCol>
              <OutlineButton onClick={() => removeQueryOrMutationField(idx)}>
                Remove field
              </OutlineButton>
            </HandlerCol>
          </HandlerRow>
        </FormGroup>
      ))}
    </>
  );
};
