import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, PrimaryButton } from '../../../ui';
import { useSoapHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const SoapHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit } = useSoapHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="WSDL (required)"
            name="wsdl"
            error={hasErrors('wsdl')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Username (required)"
            name="username"
            error={hasErrors('username')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Password (required)"
            name="password"
            type="password"
            error={hasErrors('password')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            type="password"
            label="Security Certificate Password"
            name="securityCertPassword"
            error={hasErrors('securityCertPassword')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Security Certificate Public Key"
            name="securityCertPublicKey"
            error={hasErrors('securityCertPublicKey')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Security Certificate Private Key"
            name="securityCertPrivateKey"
            error={hasErrors('securityCertPrivateKey')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
