export const randomString = (length = 10): string => {
  let result = '';
  while (result.length < length) {
    result += Math.random().toString(36).substr(2, 10);
  }
  return result.substr(0, length);
};

export const randomEmail = (length = 10, domainLength = 3): string => {
  return `${randomString(length)}@${randomString(domainLength)}.com`;
};

export const getObjectKey = (obj: { [key: string]: any }, path: string): any =>
  path.split('.').reduce((o, i) => o?.[i], obj);
