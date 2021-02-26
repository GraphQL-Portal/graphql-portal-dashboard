import React from 'react';
import { Controller } from 'react-hook-form';

import {
  FormGroup,
  Input,
  Select,
  H6,
  Tooltip,
  IconButton,
  OutlineButton,
} from '../../../ui';
import { Add } from '../../../icons';
import { SelectQueryOrMutationFieldConfig as Props } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { QUERY_OR_MUTATION_FIELD } from '../constants';
import { useStyles } from './useStyles';

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
  const { buttonCol } = useStyles();
  return (
    <>
      <HandlerRow>
        <HandlerCol>
          <H6>{TITLE}</H6>
        </HandlerCol>
        <HandlerCol>
          <div className={buttonCol}>
            <Tooltip title={`Add ${TITLE}`} placement="left">
              <IconButton onClick={addQueryOrMutationField}>
                <Add />
              </IconButton>
            </Tooltip>
          </div>
        </HandlerCol>
      </HandlerRow>
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
                defaultValue={field.title || ''}
              />
            </HandlerCol>
            <HandlerCol>
              <Input
                ref={register()}
                name={`${name}[${idx}].path`}
                error={!!errors?.[name]?.[idx]?.path}
                label="Operation Path"
                fullWidth
                defaultValue={field.path || ''}
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
                defaultValue={field.method || ''}
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
