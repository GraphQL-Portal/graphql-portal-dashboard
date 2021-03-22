import React from 'react';
import { Helmet } from 'react-helmet';

import {
  Col,
  Header,
  HugeWidget,
  Input,
  PrimaryButton,
  Row,
  WidgetRow,
} from '../../ui';
import { useProfile } from '../../presenter/Users';
import { Loading } from '../Loading';
import { useStyles } from './useStyles';

export const Profile: React.FC = () => {
  const { signOut, loading, onSubmit, register, errors } = useProfile();
  const { formRow } = useStyles();

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>User profile page</title>
      </Helmet>
      <Header title="Edit Your Profile">
        <PrimaryButton onClick={signOut}>Sign Out</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          <form onSubmit={onSubmit}>
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
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
