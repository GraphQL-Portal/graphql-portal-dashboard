import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControlLabel } from '@material-ui/core';

import { FormGroup, Row, Col, Input, Switch } from '../../../ui';
import { ApiGeneralForm as Props } from '../../../types';
import { StringArray } from '../../Form';
import { useStyles } from './useStyles';

export const GeneralForm: React.FC<Props> = ({
  register,
  control,
  errors,
  tokenFields,
  addToken,
  removeToken,
}) => {
  const { formRow, label, labelPlacementStart } = useStyles();
  return (
    <>
      <FormGroup title="General settings">
        <Row spacing={2} className={formRow}>
          <Col xs={6}>
            <Input
              name="name"
              label="API name"
              required
              fullWidth
              error={!!errors?.name}
              ref={register}
            />
          </Col>
          <Col xs={6}>
            <Input
              name="endpoint"
              label="API listen path"
              required
              fullWidth
              error={!!errors?.endpoint}
              ref={register}
            />
          </Col>
        </Row>
        <Row spacing={2}>
          <Col xs={6}>
            <FormControlLabel
              classes={{ label, labelPlacementStart }}
              control={
                <Controller
                  control={control}
                  name="playground"
                  render={(props) => <Switch {...props} />}
                />
              }
              label="Enable GraphQL playground"
              labelPlacement="start"
            />
          </Col>
        </Row>
      </FormGroup>
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
          control={control}
          errors={errors}
        />
      </FormGroup>
    </>
  );
};
