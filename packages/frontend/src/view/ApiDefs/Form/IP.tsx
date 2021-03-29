import { FormControlLabel } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Controller } from 'react-hook-form';

import { APIIPForm as Prop } from '../../../types';
import { Col, Row, Switch, FormGroup } from '../../../ui';
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
  const { label, labelPlacementStart, formRow } = useStyles();
  const firstRowClassName = clsx(enableIPFiltering && formRow);
  return (
    <FormGroup title="IP Filtering">
      <Row spacing={2} className={firstRowClassName}>
        <Col xs={6}>
          <FormControlLabel
            classes={{ label, labelPlacementStart }}
            control={
              <Controller
                control={control}
                name="enable_ip_filtering"
                render={(props) => <Switch {...props} />}
              />
            }
            label="Enable IP Filtering"
            labelPlacement="start"
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
