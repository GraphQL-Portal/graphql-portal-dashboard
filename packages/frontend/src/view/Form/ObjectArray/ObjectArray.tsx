import React from 'react';
import clsx from 'clsx';

import { Remove } from '../../../icons';
import { ObjectArrayForm as Props } from '../../../types';
import { Col, IconButton, Row, Input, Tooltip } from '../../../ui';
import { useStyles } from './useStyles';
import { AddFieldArrayHeader } from '../AddFieldArrayHeader';

export const ObjectArray: React.FC<Props> = ({
  onAdd,
  onRemove,
  register,
  errors,
  title,
  fields,
  name,
  keyLabel,
  valueLabel,
}) => {
  const { objectField, lastField, objectRow } = useStyles();

  const lastObjectField = clsx(objectField, lastField);

  if (!keyLabel) keyLabel = 'key';
  if (!valueLabel) valueLabel = 'key';

  return (
    <>
      <AddFieldArrayHeader title={title} onAddClick={onAdd} />
      {fields.length > 0 &&
        fields.map((field, idx) => (
          <Row className={objectRow} key={field.id} spacing={2}>
            <Col xs={5} className={objectField}>
              <Input
                ref={register()}
                label={keyLabel}
                name={`${name}[${idx}].${keyLabel}`}
                fullWidth
                defaultValue={(field as any)[keyLabel!] || undefined}
                error={!!errors?.[name]?.[idx]?.[keyLabel!]}
              />
            </Col>
            <Col xs={5} className={objectField}>
              <Input
                ref={register()}
                label={valueLabel}
                name={`${name}[${idx}].${valueLabel}`}
                fullWidth
                defaultValue={(field as any)[valueLabel!] || undefined}
                error={!!errors?.[name]?.[idx]?.[valueLabel!]}
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
