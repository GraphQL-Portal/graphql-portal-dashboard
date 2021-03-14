import { useFieldArray } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Col, IconButton, Input, Row, Tooltip } from '../../../ui';
import { Remove } from '../../../icons';
import { AddFieldArrayHeader } from '../../Form/AddFieldArrayHeader';
import { useStyles } from '../../Form/ObjectArray/useStyles';
import React from 'react';
import clsx from 'clsx';

export const AdditionalResolverArguments: React.FC<any> = ({
  nestIndex,
  control,
  errors,
}) => {
  const name = `mesh.additionalResolvers[${nestIndex}].args`;
  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  const { objectField, lastField, objectRow } = useStyles();

  const lastObjectField = clsx(objectField, lastField);

  return (
    <>
      <AddFieldArrayHeader title="Arguments" onAddClick={append} />
      {fields.map((field, idx) => {
        return (
          <Row key={field.id} spacing={2} className={objectRow}>
            <Col xs={5} className={objectField}>
              <Controller
                as={Input}
                control={control}
                label="Name"
                name={`${name}[${idx}].name`}
                fullWidth
                defaultValue={field.name || ''}
                error={!!errors?.[name]?.[idx]?.name}
              />
            </Col>
            <Col xs={5} className={objectField}>
              <Controller
                as={Input}
                control={control}
                label="Value"
                name={`${name}[${idx}].value`}
                fullWidth
                defaultValue={field.value || ''}
                error={!!errors?.[name]?.[idx]?.value}
              />
            </Col>
            <Col xs={2} className={lastObjectField}>
              <Tooltip title="Remove argument" placement="left">
                <IconButton onClick={() => remove(idx)}>
                  <Remove />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      })}
    </>
  );
};
