import React from 'react';
import { Helmet } from 'react-helmet';
import { Controller } from 'react-hook-form';

import { useCreateApi } from '../../../presenter/ApiDefs';
import {
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  FormGroup,
  Input,
  PrimaryButton,
  Row,
  Col,
} from '../../../ui';
import { StringArray } from '../../Form';
import { AddNewAPIHeader } from './Header';
import { useStyles } from './useStyles';

export const CreateApi: React.FC = () => {
  const { formRow } = useStyles();
  const {
    control,
    errors,
    onSubmit,
    tokenFields,
    addToken,
    removeToken,
  } = useCreateApi();

  return (
    <>
      <Helmet>
        <title>Create a new API</title>
      </Helmet>
      <AddNewAPIHeader />
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Create a new API" />
          <WidgetBody>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
              <FormGroup title="General settings">
                <Row spacing={2}>
                  <Col xs={6}>
                    <Controller
                      as={Input}
                      name="name"
                      control={control}
                      label="Api name (required)"
                      fullWidth
                    />
                  </Col>
                  <Col xs={6}>
                    <Controller
                      as={Input}
                      name="endpoint"
                      control={control}
                      label="Api listen path (required)"
                      fullWidth
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
                      fullWidth
                    />
                  </Col>
                </Row>
                <StringArray
                  onAdd={addToken}
                  onRemove={removeToken}
                  title="Auth tokens"
                  name="authentication.auth_header_tokens"
                  fields={tokenFields}
                  control={control}
                  errors={errors}
                />
              </FormGroup>
              <PrimaryButton type="submit">Create new API</PrimaryButton>
            </form>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
