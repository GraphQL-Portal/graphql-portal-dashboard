import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, PrimaryButton } from '../../../ui';
import { useMySQLHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { ObjectArray } from '../../Form';
import { getError } from '../helpers';

export const MySQLHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit, poolFields, appendPoolField, removePoolField } = useMySQLHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Host (required)"
            name="host"
            error={hasErrors('host')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Port (required)"
            name="port"
            error={hasErrors('port')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Database (required)"
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
            label="User (required)"
            name="user"
            error={hasErrors('user')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            type='password'
            label="Password (required)"
            name="password"
            error={hasErrors('password')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <ObjectArray
        title="Connection pool settings"
        name="pool"
        control={control}
        errors={errors}
        fields={poolFields}
        onAdd={appendPoolField}
        onRemove={removePoolField}
      />
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
