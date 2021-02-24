import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';

import { Col, Row, Input, Checkbox, FormGroup } from '../../../ui';
import { ApiSchemaForm as Props } from '../../../types';
import { useStyles } from './useStyles';

export const SchemaForm: React.FC<Props> = ({ register, errors, control }) => {
  const { collAlignCenter } = useStyles();
  return (
    <FormGroup title="Schema rebuilding options">
      <Row spacing={2}>
        <Col xs={6}>
          <Input
            name="schema_polling_interval"
            label="Schema polling interval"
            ref={register({
              valueAsNumber: true,
            })}
            error={!!errors?.schema_polling_interval}
            fullWidth
            type="number"
          />
        </Col>
        <Col xs={6} className={collAlignCenter}>
          <FormControlLabel
            label="Update Schema through control API"
            control={
              <Controller
                name="schema_updates_through_control_api"
                control={control}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </Col>
      </Row>
    </FormGroup>
  );
};
