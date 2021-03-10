import React from 'react';

import { FormGroup, Row, Col, Input, OutlineButton } from '../../../ui';
import { AddFieldArrayHeader } from '../../Form/AddFieldArrayHeader';
import { useStyles } from './useStyles';

export const AdditionalResolvers: React.FC<any> = ({
  resolvers,
  onAddResolver,
  onRemoveResolver,
  register,
  errors,
}) => {
  const { formRow } = useStyles();

  return (
    <FormGroup title="Additional Resolvers">
      <AddFieldArrayHeader
        title="Additional Resolver"
        onAddClick={onAddResolver}
      />
      {resolvers.map((resolver: any, idx: number) => {
        return (
          <FormGroup key={`additionalResolver-${idx}`} title="Resolver">
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].type`}
                  label="Type"
                  error={!!errors?.mesh?.additionalResolvers?.[idx]?.type}
                  defaultValue={
                    resolver.type === 'click' ? null : resolver.type
                  }
                  fullWidth
                  required
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].field`}
                  label="Field in selected type"
                  error={!!errors?.mesh?.additionalResolvers?.[idx]?.field}
                  defaultValue={resolver.field || null}
                  fullWidth
                  required
                />
              </Col>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].fieldType`}
                  label="Type of selected field"
                  error={!!errors?.mesh?.additionalResolvers?.[idx]?.fieldType}
                  defaultValue={resolver.fieldType || null}
                  fullWidth
                  required
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].targetSource`}
                  label="Target Source"
                  error={
                    !!errors?.mesh?.additionalResolvers?.[idx]?.targetSource
                  }
                  defaultValue={resolver.targetSource || null}
                  fullWidth
                  required
                />
              </Col>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].targetMethod`}
                  label="Target Method"
                  error={
                    !!errors?.mesh?.additionalResolvers?.[idx]?.targetMethod
                  }
                  defaultValue={resolver.targetMethod || null}
                  fullWidth
                  required
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].requiredSelectionSet`}
                  label="Selection Set"
                  error={
                    !!errors?.mesh?.additionalResolvers?.[idx]
                      ?.requiredSelectionSet
                  }
                  defaultValue={resolver.requiredSelectionSet || null}
                  fullWidth
                  required
                />
              </Col>
            </Row>
            <Row spacing={2}>
              <Col xs={6}>
                <OutlineButton onClick={() => onRemoveResolver(idx)}>
                  Remove Resolver
                </OutlineButton>
              </Col>
            </Row>
          </FormGroup>
        );
      })}
    </FormGroup>
  );
};
