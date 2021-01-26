import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';

import { ROUTES, useAuth } from '../../model/providers';
import { useSignUp } from '../../presenter/SignUp';
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


export const SignUp: React.FC = () => {
  const { content, logo, formFrame, formField, footerWrapper, links } = useStyles();
  const { control, onSubmit, errors } = useSignUp();
  const { accessToken } = useAuth();

  if (accessToken) return <Redirect to={ROUTES.MAIN} />

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
                  <Controller
                    as={Input}
                    control={control}
                    className={formField}
                    fullWidth
                    label="Your Email"
                    name="email"
                    error={!!(errors && errors.email)}
                    InputProps={{
                      autoComplete: 'off',
                    }}
                  />
                  <Controller
                    as={Input}
                    control={control}
                    className={formField}
                    fullWidth
                    label="Your Password"
                    name="password"
                    type="password"
                    error={!!(errors && errors.password)}
                    InputProps={{
                      autoComplete: 'off',
                    }}
                  />
                  <Controller
                    as={Input}
                    control={control}
                    className={formField}
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    error={!!(errors && errors.confirmPassword)}
                    InputProps={{
                      autoComplete: 'off',
                    }}
                  />
                </WidgetBody>
                <WidgetActions>
                  <div className={footerWrapper}>
                    <PrimaryButton fullWidth size="large" type="submit">
                      Sign Up
                  </PrimaryButton>
                    <span className={links}>
                      Already a member?<Link to={ROUTES.LOGIN}> Log In </Link>
                    </span>
                  </div>
                </WidgetActions>
              </Widget>
            </form>
          </Col>
        </Row>
      </Grid>
    </Content>
  );
}
