import React from 'react';

import { Content } from '../Content';
import { LogoFull } from '../../icons';
import { useStyles } from './useStyles';
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

export const Login:React.FC = () => {
  const { content, logo, formFrame, formField } = useStyles();

  return (
    <Content className={content}>
      <div className={logo}>
        <LogoFull />
      </div>
      <Grid>
        <Row justify="center">
          <Col xs={12} sm={6} md={5} lg={3}>
            <Widget className={formFrame}>
              <WidgetBody>
                <Input fullWidth label="Your Email" className={formField} />
                <Input type="password" fullWidth label="Your password" className={formField} />
              </WidgetBody>
              <WidgetActions>
                <PrimaryButton fullWidth size="large">
                  Sign In With Email
                </PrimaryButton>
              </WidgetActions>
            </Widget>
          </Col>
        </Row>
      </Grid>
    </Content>
  );
}
