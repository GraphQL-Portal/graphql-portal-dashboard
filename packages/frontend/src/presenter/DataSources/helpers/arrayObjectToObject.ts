import { FieldArray } from '../../../types';

export const arrayObjectToObject = (
  objects: FieldArray = []
): Record<string, unknown> => {
  return objects.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, unknown>);
};
