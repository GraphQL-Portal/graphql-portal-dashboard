import React from 'react';

import { Input, PrimaryButton } from '../../../ui';
import { useMySQLHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { ObjectArray } from '../../Form';
import { getError } from '../helpers';

export const MySQLHandler: React.FC<HandlerStep> = (props) => {
  const {
    register,
    errors,
    onSubmit,
    poolFields,
    appendPoolField,
    removePoolField,
  } = useMySQLHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Host"
            required
            name="host"
            error={hasErrors('host')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Port"
            required
            name="port"
            error={hasErrors('port')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Database"
            required
            name="database"
            error={hasErrors('database')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="User"
            required
            name="user"
            error={hasErrors('user')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            type="password"
            label="Password"
            required
            name="password"
            error={hasErrors('password')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <ObjectArray
        title="Connection pool settings"
        name="pool"
        register={register}
        errors={errors}
        fields={poolFields}
        onAdd={appendPoolField}
        onRemove={removePoolField}
      />
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
