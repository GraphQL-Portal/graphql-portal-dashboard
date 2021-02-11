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
  Select,
  PrimaryButton,
  OutlineButton,
  Row,
  Col,
} from '../../../ui';
import { StringArray } from '../../Form';
import { ConnectedList } from '../../DataSources/DataSources/ConnectedList';
import { AddNewAPIHeader } from './Header';
import { useStyles } from './useStyles';

export const CreateApi: React.FC = () => {
  const { formRow, addButton } = useStyles();
  const {
    connected,
    control,
    errors,
    onSubmit,
    options,
    tokenFields,
    addToken,
    removeToken,
    onAddSource,
    onRemoveSource,
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
                      error={!!errors?.name}
                    />
                  </Col>
                  <Col xs={6}>
                    <Controller
                      as={Input}
                      name="endpoint"
                      control={control}
                      label="Api listen path (required)"
                      fullWidth
                      error={!!errors?.endpoint}
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
              <FormGroup title="Data Sources">
                <Row spacing={2}>
                  <Col xs={6}>
                    <Controller
                      as={Select}
                      name="source"
                      control={control}
                      options={options}
                      label="Select data-source to add"
                      fullWidth
                    />
                  </Col>
                  <Col xs={6}>
                    <OutlineButton onClick={onAddSource} className={addButton}>
                      Add Data Source
                    </OutlineButton>
                  </Col>
                </Row>
                {connected.length > 0 && (
                  <ConnectedList
                    onDelete={onRemoveSource}
                    sources={connected}
                  />
                )}
              </FormGroup>
              <PrimaryButton type="submit">Create new API</PrimaryButton>
            </form>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
