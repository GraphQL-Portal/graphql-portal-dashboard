import React from 'react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

import { Remove } from '../../../icons';
import { ObjectArrayForm as Props } from '../../../types';
import { Col, IconButton, Row, Input, Tooltip } from '../../../ui';
import { useStyles } from './useStyles';
import { AddFieldArrayHeader } from '../AddFieldArrayHeader';

export const ObjectArray: React.FC<Props> = ({
  onAdd,
  onRemove,
  control,
  errors,
  title,
  fields,
  name,
  keyLabel,
  valueLabel,
}) => {
  const { objectField, lastField, objectRow } = useStyles();

  const lastObjectField = clsx(objectField, lastField);

  return (
    <>
      <AddFieldArrayHeader title={title} onAddClick={onAdd} />
      {fields.length > 0 &&
        fields.map((field, idx) => (
          <Row className={objectRow} key={field.id} spacing={2}>
            <Col xs={5} className={objectField}>
              <Controller
                as={Input}
                control={control}
                label={keyLabel || 'key'}
                name={`${name}[${idx}].key`}
                fullWidth
                defaultValue={field.key || undefined}
                error={!!errors?.[name]?.[idx]?.key}
              />
            </Col>
            <Col xs={5} className={objectField}>
              <Controller
                as={Input}
                control={control}
                label={valueLabel || 'value'}
                name={`${name}[${idx}].value`}
                fullWidth
                defaultValue={field.value || undefined}
                error={!!errors?.[name]?.[idx]?.value}
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
