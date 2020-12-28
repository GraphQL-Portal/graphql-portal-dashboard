import React from 'react';
import { Controller } from 'react-hook-form';

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

export const Login:React.FC = () => {
  const { content, logo, formFrame, formField } = useStyles();
  const { control, onSubmit, errors } = useLogin();

  console.log('ERRORS IS: ', errors)

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
                  />
                </WidgetBody>
                <WidgetActions>
                  <PrimaryButton fullWidth size="large" type="submit">
                    Sign In With Email
                  </PrimaryButton>
                </WidgetActions>
              </Widget>
            </form>
          </Col>
        </Row>
      </Grid>
    </Content>
  );
}
