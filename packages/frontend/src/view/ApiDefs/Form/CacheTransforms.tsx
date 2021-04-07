import React from 'react';
import { CacheTransforms as Props } from '../../../types';
import { Col, FormGroup, Input, OutlineButton, Row } from '../../../ui';
import { AddFieldArrayHeader } from '../../Form/AddFieldArrayHeader';
import { useStyles } from './useStyles';
import { CacheTransformsInvalidateOperations } from './CacheTransformsInvalidateOperations';

export const CacheTransforms: React.FC<Props> = ({
  cache,
  onAddCache,
  onRemoveCache,
  register,
  errors,
  control,
}) => {
  const { formRow } = useStyles();

  return (
    <FormGroup title="Cache Transforms">
      <AddFieldArrayHeader title="Cache Transform" onAddClick={onAddCache} />
      {cache.map((cache: any, idx: number) => {
        return (
          <FormGroup key={`cacheTransform-${idx}`} title="Cache Transform">
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`cache[${idx}].field`}
                  label="Field"
                  error={!!errors?.cache?.[idx]?.field}
                  defaultValue={cache.field || undefined}
                  fullWidth
                  required
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`cache[${idx}].cacheKey`}
                  label="Custom cache key"
                  error={!!errors?.cache?.[idx]?.cacheKey}
                  defaultValue={cache.cacheKey || undefined}
                  fullWidth
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`cache[${idx}].invalidate.ttl`}
                  label="TTL"
                  error={!!errors?.cache?.[idx]?.invalidate?.ttl}
                  defaultValue={cache.invalidate?.ttl || undefined}
                  fullWidth
                />
              </Col>
            </Row>
            <CacheTransformsInvalidateOperations
              nestIndex={idx}
              control={control}
              errors={errors}
              register={register}
            />
            <Row spacing={2}>
              <Col xs={6}>
                <OutlineButton onClick={() => onRemoveCache(idx)}>
                  Remove Cache Transform
                </OutlineButton>
              </Col>
            </Row>
          </FormGroup>
        );
      })}
    </FormGroup>
  );
};
