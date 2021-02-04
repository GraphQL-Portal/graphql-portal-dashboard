export const objectToFieldArray = (object: any = {}) => {
  return Object.entries(object).map((entry) => ({
    key: entry[0],
    value: entry[1],
  }));
};
