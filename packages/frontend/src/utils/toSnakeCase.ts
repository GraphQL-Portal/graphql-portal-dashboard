export const toSnakeCase = (str: string): string =>
  str.toLowerCase().replace(/\s/g, '-');
