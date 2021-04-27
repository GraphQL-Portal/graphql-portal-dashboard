import React from 'react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';

import { APIIPForm as Prop } from '../../../types';
import { Col, Row, Switch, FormGroup, FormLabelStart } from '../../../ui';
import { StringArray } from '../../Form';
import { useStyles } from './useStyles';

export const IPForm: React.FC<Prop> = ({
  register,
  control,
  errors,
  allowedIP,
  addAllowedIP,
  removeAllowedIP,
  deniedIP,
  addDeniedIP,
  removeDeniedIP,
  enableIPFiltering,
}) => {
  const { formRow } = useStyles();
  const firstRowClassName = clsx(enableIPFiltering && formRow);
  return (
    <FormGroup title="IP Filtering">
      <Row spacing={2} className={firstRowClassName}>
        <Col xs={6}>
          <FormLabelStart
            control={
              <Controller
                control={control}
                name="enable_ip_filtering"
                render={(props) => <Switch {...props} />}
              />
            }
            label="Enable IP Filtering"
          />
        </Col>
      </Row>
      {enableIPFiltering && (
        <>
          <Row spacing={2}>
            <StringArray
              name="allow_ips"
              title="Allowed IP"
              fields={allowedIP}
              onAdd={addAllowedIP}
              onRemove={removeAllowedIP}
              register={register}
              errors={errors}
            />
          </Row>
          <Row spacing={2}>
            <StringArray
              name="deny_ips"
              title="Denied IP"
              fields={deniedIP}
              onAdd={addDeniedIP}
              onRemove={removeDeniedIP}
              register={register}
              errors={errors}
            />
          </Row>
        </>
      )}
    </FormGroup>
  );
};
