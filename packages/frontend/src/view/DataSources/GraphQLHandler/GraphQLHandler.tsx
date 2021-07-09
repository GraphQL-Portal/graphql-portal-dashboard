import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, Checkbox, PrimaryButton, Select, FormLabel } from '../../../ui';
import { useGraphQLHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { GRAPHQL_METHODS } from '../constants';
import { getError } from '../helpers';

export const GraphQLHandler: React.FC<HandlerStep> = (props) => {
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
  } = useGraphQLHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
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
          <FormLabel
            label="Use HTTP GET for query operations"
            control={
              <Controller
                name="useGETForQueries"
                control={control}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormLabel
            label="Use SSE instead of WebSocket for subscriptions"
            control={
              <Controller
                name="useSSEForSubscription"
                control={control}
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
      <HandlerRow>
        <HandlerCol>
          <FormLabel
            label='Use legacy web socket protocol "subscriptions-transport-ws" instead of the more current "graphql-ws"'
            control={
              <Controller
                name="useWebSocketLegacyProtocol"
                control={control}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormLabel
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
