import { FieldArray, ObjectArrayItem } from '../../../types';

export const arrayObjectToObject = (
  objects: FieldArray<ObjectArrayItem> = []
): Record<string, string> => {
  return objects.reduce((acc, { key, value }) => {
    if (!!key && !!value) acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
};
