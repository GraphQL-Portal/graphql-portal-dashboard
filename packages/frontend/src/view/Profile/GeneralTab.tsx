import React from 'react';

import { Col, Input, PrimaryButton, Row } from '../../ui';
import { useProfileGeneral } from '../../presenter/Users';
import { ProfileGeneralTab as Props } from '../../types';
import { useStyles } from './useStyles';

export const GeneralTab: React.FC<Props> = (props) => {
  const { onSubmit, register, errors } = useProfileGeneral(props);
  const { formRow, tab } = useStyles();

  return (
    <form onSubmit={onSubmit} className={tab}>
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <Input
            name="firstName"
            ref={register}
            error={!!errors?.firstName}
            fullWidth
            label="First name"
          />
        </Col>
      </Row>
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <Input
            name="lastName"
            ref={register}
            error={!!errors?.lastName}
            fullWidth
            label="Last name"
          />
        </Col>
      </Row>
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <Input
            name="email"
            ref={register}
            error={!!errors?.email}
            fullWidth
            label="Email"
            disabled
          />
        </Col>
      </Row>
      <PrimaryButton type="submit">Update Profile</PrimaryButton>
    </form>
  );
};
