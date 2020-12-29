import { SourceSchema } from './types';

export const getAvailableSources = (rawSourceSchema: SourceSchema) => {
  return Object.keys(rawSourceSchema).map((key) => {
    const { title, type } = rawSourceSchema[key];

    return { title, type };
  });
};
