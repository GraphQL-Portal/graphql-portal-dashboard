import React from 'react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';

import { Remove } from '../../../icons';
import { ObjectArrayWithSelectForm as Props } from '../../../types';
import { Col, IconButton, Row, Input, Tooltip, Select } from '../../../ui';
import { useStyles } from './useStyles';

export const ObjectArrayWithSelect: React.FC<Props> = ({
  onRemove,
  register,
  errors,
  fields,
  name,
  options,
  label = 'key',
  helperText = '',
  control,
  selectLabel = 'select',
}) => {
  const { objectField, lastField, objectRow } = useStyles();

  const lastObjectField = clsx(objectField, lastField);

  return (
    <>
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
          return (
            <Row className={objectRow} key={field.id} spacing={2}>
              <>
                <Col xs={5} className={objectField}>
                  <Controller
                    as={Select}
                    name={`${name}[${idx}].${selectLabel}`}
                    control={control}
                    options={options}
                    label={selectLabel}
                    fullWidth
                    defaultValue={options[0].value}
                    error={!!errors?.[name]?.[idx]?.[selectLabel]}
                  />
                </Col>
                <Col xs={5} className={objectField}>
                  <Input
                    ref={register()}
                    label={label}
                    name={`${name}[${idx}].${[label]}`}
                    fullWidth
                    defaultValue={(field as any)[label] || undefined}
                    error={!!errors?.[name]?.[idx]?.[label]}
                    helperText={helperText || ''}
                  />
                </Col>
                {remove}
              </>
            </Row>
          );
        })}
    </>
  );
};
