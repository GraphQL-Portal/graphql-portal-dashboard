import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControlLabel } from '@material-ui/core';

import { FormGroup, Row, Col, Input, Switch } from '../../../ui';
import { GeneralForm as Props } from '../../../types';
import { StringArray } from '../../Form';
import { useStyles } from './useStyles';

export const GeneralForm: React.FC<Props> = ({
  control,
  errors,
  addToken,
  removeToken,
  tokenFields,
}) => {
  const { formRow, label, labelPlacementStart } = useStyles();
  return (
    <>
      <FormGroup title="General settings">
        <Row spacing={2} className={formRow}>
          <Col xs={6}>
            <Controller
              as={Input}
              name="name"
              control={control}
              label="API name"
              required
              fullWidth
              error={!!errors?.name}
            />
          </Col>
          <Col xs={6}>
            <Controller
              as={Input}
              name="endpoint"
              control={control}
              label="API listen path"
              required
              fullWidth
              error={!!errors?.endpoint}
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
              label="Enable GraphQl playground"
              labelPlacement="start"
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup title="Authentication">
        <Row spacing={2} className={formRow}>
          <Col xs={6}>
            <Controller
              as={Input}
              name="authentication.auth_header_name"
              control={control}
              label="Auth key header name"
              error={!!errors?.authentication?.auth_header_name}
              fullWidth
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
