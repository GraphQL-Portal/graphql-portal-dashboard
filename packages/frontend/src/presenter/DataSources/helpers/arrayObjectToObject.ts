export const arrayObjectToObject = (objects: { key: string, value: string }[] = []): Record<string, unknown> => {
  return objects.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, unknown>);
}