import React from 'react';
import { Controller } from 'react-hook-form';

import { FormGroup, Row, Col, Select, OutlineButton } from '../../../ui';
import { ApiDataSourcesForm as Props } from '../../../types';
import { ConnectedList } from '../../DataSources/DataSources/ConnectedList';
import { useStyles } from './useStyles';

export const DataSourcesForm: React.FC<Props> = ({
  control,
  options,
  onAddSource,
  connected,
  onRemoveSource,
}) => {
  const { addButton } = useStyles();
  return (
    <FormGroup title="Data Sources">
      <Row spacing={2}>
        <Col xs={6}>
          <Controller
            as={Select}
            name="source"
            control={control}
            options={options}
            label="Select data-source to add"
            fullWidth
          />
        </Col>
        <Col xs={6}>
          <OutlineButton onClick={onAddSource} className={addButton}>
            Add Data Source
          </OutlineButton>
        </Col>
      </Row>
      {connected.length > 0 && (
        <ConnectedList onDelete={onRemoveSource} sources={connected} />
      )}
    </FormGroup>
  );
};
