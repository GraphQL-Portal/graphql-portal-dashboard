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

export const getArrayRepeats = (arr: string[]): string[] => {
  const counts: { [key: string]: number } = {};
  for (const value of arr) {
    if (!counts[value]) {
      counts[value] = 0;
    }
    counts[value] += 1;
  }
  const repeats = [];
  for (const key of Object.keys(counts)) {
    if (counts[key] > 1) {
      repeats.push(key);
    }
  }
  return repeats;
};
