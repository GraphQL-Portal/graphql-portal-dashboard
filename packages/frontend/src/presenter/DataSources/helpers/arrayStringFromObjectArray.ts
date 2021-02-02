export const arrayStringFromObjectArray = (objects: { value: string }[] = []): string[] => {
  return objects.reduce((acc, { value }) => {
    acc.push(value);
    return acc;
  }, [] as string[]);
}