import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, FormGroup } from '@material-ui/core';

import { Input, Checkbox, PrimaryButton, Select } from '../../../ui';
import { useGraphQLHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { GRAPHQL_METHODS } from '../constants';
import { getError } from '../helpers';

export const GraphQLHandler: React.FC<HandlerStep> = (props) => {
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
  } = useGraphQLHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="URL of an existing GraphQL endpoint"
            required
            name="endpoint"
            error={hasErrors('endpoint')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Select}
            control={control}
            name="method"
            options={GRAPHQL_METHODS}
            labelId="method"
            label="HTTP Method"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                label="Use HTTP GET for query operations"
                control={
                  <Controller
                    name="useGETForQueries"
                    control={control}
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
          <FormControl>
            <FormGroup>
              <FormControlLabel
                label="Use SSE instead of WebSocked for subscriptions"
                control={
                  <Controller
                    name="useSSEForSubscription"
                    control={control}
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
          <FormControl>
            <FormGroup>
              <FormControlLabel
                label="Cache Introspection"
                control={
                  <Controller
                    name="cacheIntrospection"
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
          <FormControl>
            <FormGroup>
              <FormControlLabel
                label="Enable multipart/formdata in order to support file uploads"
                control={
                  <Controller
                    name="multipart"
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
      {/*<HandlerRow>*/}
      {/*  <HandlerCol>*/}
      {/*    <Controller*/}
      {/*      as={Input}*/}
      {/*      control={control}*/}
      {/*      name="customFetch"*/}
      {/*      label="Path to W3 Compatible Fetch Implementation"*/}
      {/*      fullWidth*/}
      {/*    />*/}
      {/*  </HandlerCol>*/}
      {/*</HandlerRow>*/}
      {/*<HandlerRow>*/}
      {/*  <HandlerCol>*/}
      {/*    <Controller*/}
      {/*      as={Input}*/}
      {/*      control={control}*/}
      {/*      name="webSocketImpl"*/}
      {/*      label="Path to W3 Compatible WebSocket Implementation"*/}
      {/*      fullWidth*/}
      {/*    />*/}
      {/*  </HandlerCol>*/}
      {/*</HandlerRow>*/}
      {/*<HandlerRow>*/}
      {/*  <HandlerCol>*/}
      {/*    <Controller*/}
      {/*      as={Input}*/}
      {/*      control={control}*/}
      {/*      name="introspection"*/}
      {/*      label="Path to the introspection"*/}
      {/*      fullWidth*/}
      {/*    />*/}
      {/*  </HandlerCol>*/}
      {/*</HandlerRow>*/}
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
