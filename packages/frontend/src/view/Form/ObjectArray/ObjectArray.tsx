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
  objectSchema = {
    key: {
      label: 'key',
      helperText: '',
    },
    value: {
      label: 'value',
      helperText: '',
    },
  },
}) => {
  const { objectField, lastField, objectRow } = useStyles();

  const lastObjectField = clsx(objectField, lastField);

  return (
    <>
      <AddFieldArrayHeader title={title} onAddClick={onAdd} />
      {fields.length > 0 &&
        fields.map((field, idx) => {
          const remove = (
            <Col xs={1} className={lastObjectField}>
              <Tooltip title="Remove field" placement="left">
                <IconButton onClick={() => onRemove(idx)}>
                  <Remove />
                </IconButton>
              </Tooltip>
            </Col>
          );
          const keys = Object.keys(objectSchema);
          return (
            <Row className={objectRow} key={field.id} spacing={2}>
              {keys.map((key, i) => {
                const schema = objectSchema[key];
                return (
                  <>
                    <Col xs={5} className={objectField}>
                      <Input
                        ref={register()}
                        label={schema.label || key}
                        name={`${name}[${idx}].${key}`}
                        fullWidth
                        defaultValue={(field as any)[key!] || undefined}
                        error={!!errors?.[name]?.[idx]?.[key!]}
                        helperText={schema.helperText || ''}
                      />
                    </Col>
                    {i === 1 ? remove : null}
                  </>
                );
              })}
              {keys.length < 2 ? remove : null}
            </Row>
          );
        })}
    </>
  );
};
