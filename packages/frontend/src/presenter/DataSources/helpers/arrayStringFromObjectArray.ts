import { StringArray } from '../../../types';

export const arrayStringFromObjectArray = (
  objects: StringArray = []
): string[] => {
  return objects.reduce((acc, { value }) => {
    acc.push(value);
    return acc;
  }, [] as string[]);
};
