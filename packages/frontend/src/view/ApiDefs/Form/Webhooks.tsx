import React from 'react';
import { Row, FormGroup } from '../../../ui';
import { ObjectArrayWithSelect } from '../../Form';
import { AddFieldArrayHeader } from '../../Form/AddFieldArrayHeader';
import { useStyles } from './useStyles';
import { WEBHOOKS_OPTIONS } from './constants';

export const WebhooksForm: React.FC<any> = ({
  register,
  control,
  errors,
  hooks,
  addHook,
  removeHook,
}) => {
  const { formRow } = useStyles();

  return (
    <FormGroup title="Webhooks">
      <AddFieldArrayHeader title="Webhook" onAddClick={addHook} />
      <Row className={formRow}>
        <ObjectArrayWithSelect
          title="Webhooks"
          name="webhooks"
          register={register}
          errors={errors}
          fields={hooks}
          onAdd={addHook}
          onRemove={removeHook}
          options={WEBHOOKS_OPTIONS}
          control={control}
          label={'url'}
          selectLabel={'event'}
        />
      </Row>
    </FormGroup>
  );
};
