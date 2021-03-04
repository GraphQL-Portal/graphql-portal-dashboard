import React from 'react';

import { Add } from '../../../icons';
import { Col, IconButton, Row, Tooltip, H6 } from '../../../ui';
import { useStyles } from './useStyles';

export const AddFieldArrayHeader: React.FC<any> = ({ title, onAddClick }) => {
  const { header, titleCol, buttonCol } = useStyles();
  return (
    <Row className={header} spacing={2}>
      <Col xs={6} className={titleCol}>
        <H6>{title}</H6>
      </Col>
      <Col xs={6} className={buttonCol}>
        <Tooltip title={`Add ${title}`} placement="left">
          <IconButton onClick={onAddClick}>
            <Add />
          </IconButton>
        </Tooltip>
      </Col>
    </Row>
  );
};
