import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import { ROUTES, useAuth } from '../../model/providers';
import { useLogin } from '../../presenter/Login';
import { LogoFull } from '../../icons';
import {
  Grid,
  Row,
  Col,
  Input,
  PrimaryButton,
  Widget,
  WidgetBody,
  WidgetActions,
} from '../../ui';
import { Content } from '../Content';
import { useStyles } from './useStyles';

export const Login: React.FC = () => {
  const {
    content,
    logo,
    formFrame,
    formField,
    footerWrapper,
    links,
  } = useStyles();
  const { register, onSubmit, errors } = useLogin();
  const { accessToken } = useAuth();

  if (accessToken) return <Redirect to={ROUTES.MAIN} />;

  return (
    <Content className={content}>
      <div className={logo}>
        <LogoFull />
      </div>
      <Grid>
        <Row justify="center">
          <Col xs={12} sm={6} md={5} lg={3}>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              <Widget className={formFrame}>
                <WidgetBody>
                  <Input
                    ref={register}
                    className={formField}
                    fullWidth
                    label="Your Email"
                    name="email"
                    error={!!errors?.email}
                  />
                  <Input
                    ref={register}
                    className={formField}
                    fullWidth
                    label="Your Password"
                    name="password"
                    type="password"
                    error={!!errors?.password}
                  />
                </WidgetBody>
                <WidgetActions>
                  <div className={footerWrapper}>
                    <PrimaryButton fullWidth size="large" type="submit">
                      Sign In With Email
                    </PrimaryButton>
                    <div className={links}>
                      <Link to={ROUTES.RESET_PASSWORD_REQUEST}>
                        Reset password
                      </Link>
                      <Link to={ROUTES.SIGN_UP}>Create account</Link>
                    </div>
                  </div>
                </WidgetActions>
              </Widget>
            </form>
          </Col>
        </Row>
      </Grid>
    </Content>
  );
};
