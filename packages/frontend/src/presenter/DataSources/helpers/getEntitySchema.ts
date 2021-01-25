import { compose, getProp } from '../../../utils';
import { getProperties } from './general';

const getEntitySchema = (entity: string) => (definitions: any) => (handler: string) => compose(
  getProp(handler),
  getProperties,
  getProp(entity)
)(definitions);

export const getHandlerSchema = getEntitySchema('Handler');
export const getTransformSchema = getEntitySchema('Transform');
