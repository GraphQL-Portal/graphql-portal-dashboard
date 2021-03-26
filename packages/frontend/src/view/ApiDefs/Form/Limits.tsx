import React from 'react';

import { Col, FormGroup, Input, Row } from '../../../ui';
import { APILimitsForm as Props } from '../../../types';
import { useStyles } from './useStyles';

export const LimitsForm: React.FC<Props> = ({ register, errors }) => {
  const { formRow } = useStyles();
  return (
    <FormGroup title="Rate and complexity limiting">
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <Input
            name="request_size_limit"
            label="Request size limit"
            error={!!errors?.request_size_limit}
            fullWidth
            ref={register}
          />
        </Col>
        <Col xs={6}>
          <Input
            name="request_complexity_limit"
            label="Request complexity limit"
            ref={register({
              valueAsNumber: true,
            })}
            error={!!errors?.request_complexity_limit}
            fullWidth
            type="number"
          />
        </Col>
      </Row>
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <Input
            name="depth_limit"
            label="Depth limit"
            ref={register({
              valueAsNumber: true,
            })}
            error={!!errors?.depth_limit}
            fullWidth
            type="number"
          />
        </Col>
        <Col xs={6} />
      </Row>
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <Input
            name="rate_limit.complexity"
            label="Rate limit complexity"
            ref={register({
              valueAsNumber: true,
            })}
            error={!!errors?.rate_limit?.complexity}
            fullWidth
            type="number"
          />
        </Col>
        <Col xs={6}>
          <Input
            name="rate_limit.per"
            label="Rate limit per"
            ref={register({
              valueAsNumber: true,
            })}
            error={!!errors?.rate_limit?.per}
            fullWidth
            type="number"
          />
        </Col>
      </Row>
    </FormGroup>
  );
};
