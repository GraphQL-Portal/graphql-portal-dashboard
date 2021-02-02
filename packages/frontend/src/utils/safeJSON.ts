export const safeJSON = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return {};
  }
};