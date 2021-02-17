import React from 'react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

import { Add, Remove } from '../../../icons';
import { ObjectArray as Props } from '../../../types';
import { Col, IconButton, Row, Input, Tooltip, H6 } from '../../../ui';
import { useStyles } from './useStyles';

export const StringArray: React.FC<Props> = ({
  onAdd,
  onRemove,
  control,
  errors,
  title,
  fields,
  name,
}) => {
  const { objectField, lastField, objectRow } = useStyles();

  const lastObjectField = clsx(objectField, lastField);

  return (
    <>
      <Row className={objectRow} spacing={2}>
        <Col xs={6} className={objectField}>
          <H6>{title}</H6>
        </Col>
        <Col xs={6} className={lastObjectField}>
          <Tooltip title={`Add ${title}`} placement="left">
            <IconButton onClick={onAdd}>
              <Add />
            </IconButton>
          </Tooltip>
        </Col>
      </Row>
      {fields.length > 0 &&
        fields.map((field, idx) => (
          <Row className={objectRow} key={field.id} spacing={2}>
            <Col xs={5} className={objectField}>
              <Controller
                as={Input}
                control={control}
                name={`${name}[${idx}].value`}
                fullWidth
                defaultValue={field.value}
              />
            </Col>
            <Col xs={2} className={lastObjectField}>
              <Tooltip title="Remove field" placement="left">
                <IconButton onClick={() => onRemove(idx)}>
                  <Remove />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        ))}
    </>
  );
};
