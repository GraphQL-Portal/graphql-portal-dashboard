import React from 'react';

import { Input, PrimaryButton } from '../../../ui';
import { useSoapHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';

export const SoapHandler: React.FC<HandlerStep> = (props) => {
  const { register, errors, onSubmit } = useSoapHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="WSDL"
            required
            name="wsdl"
            error={!!errors?.wsdl}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Username"
            name="basicAuth.username"
            error={!!errors?.username}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Password"
            name="basicAuth.password"
            type="password"
            error={!!errors?.password}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            type="password"
            label="Security Certificate Password"
            name="securityCert.password"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Security Certificate Public Key"
            name="securityCert.publicKey"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Security Certificate Private Key"
            name="securityCert.privateKey"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
