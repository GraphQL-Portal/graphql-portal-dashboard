import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, Checkbox, PrimaryButton, FormLabel } from '../../../ui';
import { useNeo4jHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';

export const Neo4jHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit, register } = useNeo4jHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Url"
            required
            name="url"
            error={!!errors?.url}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Username"
            required
            name="username"
            error={!!errors?.username}
            fullWidth
            InputProps={{
              autoComplete: 'off',
            }}
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Password"
            required
            name="password"
            type="password"
            error={!!errors?.password}
            fullWidth
            InputProps={{
              autoComplete: 'off',
            }}
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Database"
            name="database"
            error={!!errors?.database}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Type definitions"
            name="typeDefs"
            error={!!errors?.typeDefs}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormLabel
            label="Relationships should always be included in the type definitions"
            control={
              <Controller
                name="alwaysIncludeRelationships"
                control={control}
                defaultValue={false}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
