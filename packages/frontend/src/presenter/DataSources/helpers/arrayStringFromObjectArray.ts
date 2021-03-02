import { FieldArray, StringArrayItem } from '../../../types';

export const arrayStringFromObjectArray = (
  objects: FieldArray<StringArrayItem> = []
): string[] => {
  return objects.reduce((acc, { value }) => {
    acc.push(value!);
    return acc;
  }, [] as string[]);
};
