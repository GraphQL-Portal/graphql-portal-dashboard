import { SourceSchema, DataSource } from './types';

export const getAvailableSources = (rawSourceSchema: SourceSchema) => {
  return Object.keys(rawSourceSchema).map((key) => {
    const { title, type } = rawSourceSchema[key];

    // @TODO map over description list and add it here
    return { title, type, description: '' };
  });
};

const stringHas = (str: string, query: string) =>
  str
    .toLocaleLowerCase()
    .indexOf(query.toLocaleLowerCase()) !== -1;

export const getFilteredList = (query: string, sources: DataSource[]) =>
  sources.filter(
    ({ title, description }) => stringHas(title, query) || stringHas(description, query)
  );
