import React from 'react';
import { Redirect } from 'react-router-dom';
import { Controller } from 'react-hook-form';

import { ROUTES, useAuth } from '../../model/providers';
import { useResetPasswordRequest } from '../../presenter/ResetPasswordRequest';
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

export const ResetPasswordRequest: React.FC = () => {
  const { content, logo, formFrame, footerWrapper, links } = useStyles();
  const { control, onSubmit, errors } = useResetPasswordRequest();
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
                    fullWidth
                    label="Your Email"
                    name="email"
                    error={!!(errors && errors.email)}
                    InputProps={{
                      autoComplete: 'off',
                    }}
                  />
                </WidgetBody>
                <WidgetActions>
                  <div className={footerWrapper}>
                    <PrimaryButton fullWidth size="large" type="submit">
                      Send
                    </PrimaryButton>
                    <span className={links}>
                      An email will be sent to you with a link to reset your
                      password.
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
};
