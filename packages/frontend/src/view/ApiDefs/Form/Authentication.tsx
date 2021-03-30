import React from 'react';

import { FormGroup, Row, Col, Input } from '../../../ui';
import { ApiAuthenticationForm as Props } from '../../../types';
import { StringArray } from '../../Form';

import { useStyles } from './useStyles';

export const AuthenticationForm: React.FC<Props> = ({
  register,
  errors,
  tokenFields,
  addToken,
  removeToken,
}) => {
  const { formRow } = useStyles();
  return (
    <FormGroup title="Authentication">
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <Input
            ref={register}
            name="authentication.auth_header_name"
            required
            fullWidth
            label="Auth key header name"
            error={!!errors?.authentication?.auth_header_name}
          />
        </Col>
      </Row>
      <StringArray
        onAdd={addToken}
        onRemove={removeToken}
        title="Auth tokens"
        name="authentication.auth_tokens"
        fields={tokenFields}
        register={register}
        errors={errors}
      />
    </FormGroup>
  );
};
