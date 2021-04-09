import React from 'react';

import { useProfilePasswordTab } from '../../presenter/Users';
import { ProfilePasswordTab as Props } from '../../types';
import { Col, PasswordInput, PrimaryButton, Row } from '../../ui';
import { useStyles } from './useStyles';

export const PasswordTab: React.FC<Props> = (props) => {
  const { onSubmit, register, errors } = useProfilePasswordTab(props);
  const { tab, formRow } = useStyles();
  return (
    <form onSubmit={onSubmit} className={tab}>
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <PasswordInput
            ref={register}
            fullWidth
            label="Old Password"
            name="oldPassword"
            error={!!errors?.oldPassword}
            labelWidth={115}
          />
        </Col>
      </Row>
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <PasswordInput
            ref={register}
            fullWidth
            label="New Password"
            name="newPassword"
            error={!!errors?.newPassword}
            labelWidth={115}
          />
        </Col>
      </Row>
      <Row spacing={2} className={formRow}>
        <Col xs={6}>
          <PasswordInput
            ref={register}
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            error={!!errors?.confirmPassword}
            labelWidth={140}
          />
        </Col>
      </Row>
      <PrimaryButton type="submit">Update Profile</PrimaryButton>
    </form>
  );
};
