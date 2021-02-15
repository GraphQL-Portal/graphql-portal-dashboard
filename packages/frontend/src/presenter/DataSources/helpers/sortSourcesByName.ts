import { DataSource } from '../../../types';

export const sortSourcesByName = (data: DataSource[]): DataSource[] => {
  if (!data) return [];

  return data.slice().sort((one, two) => (one.name > two.name ? 1 : -1));
};
