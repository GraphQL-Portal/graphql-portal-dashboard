import React from 'react';
import { Redirect } from 'react-router-dom';
import { Controller } from 'react-hook-form';

import { ROUTES, useAuth } from '../../model/providers';
import { useResetPassword } from '../../presenter/ResetPassword';
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

export const ResetPassword: React.FC = () => {
  const { content, logo, formFrame, formField } = useStyles();
  const { control, onSubmit, errors } = useResetPassword();
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
                  <PrimaryButton fullWidth size="large" type="submit">
                    Reset password
                  </PrimaryButton>
                </WidgetActions>
              </Widget>
            </form>
          </Col>
        </Row>
      </Grid>
    </Content>
  );
};
