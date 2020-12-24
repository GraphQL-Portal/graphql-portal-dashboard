export const randomString = (length = 10): string => {
  let result = '';
  while (result.length < length) {
    result += Math.random().toString(36).substr(2, 10);
  }
  return result.substr(0, length);
};
