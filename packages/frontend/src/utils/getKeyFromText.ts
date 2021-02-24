export const getKeyFromText = (text: string) =>
  `${text.replace(/\s/g, '-').toLowerCase()}-${Date.now()}`;
