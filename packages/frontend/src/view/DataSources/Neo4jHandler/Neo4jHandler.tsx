import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, Checkbox, PrimaryButton, FormLabel } from '../../../ui';
import { useNeo4jHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const Neo4jHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit } = useNeo4jHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Url"
            required
            name="url"
            error={hasErrors('url')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Username"
            required
            name="username"
            error={hasErrors('username')}
            fullWidth
            InputProps={{
              autoComplete: 'off',
            }}
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Password"
            required
            name="password"
            type="password"
            error={hasErrors('password')}
            fullWidth
            InputProps={{
              autoComplete: 'off',
            }}
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Database"
            name="database"
            error={hasErrors('database')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Type definitions"
            name="typeDefs"
            error={hasErrors('typeDefs')}
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
      <HandlerRow>
        <HandlerCol>
          <FormLabel
            label="Cache introspection"
            control={
              <Controller
                name="cacheIntrospection"
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
