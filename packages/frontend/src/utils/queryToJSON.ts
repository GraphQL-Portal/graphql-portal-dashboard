export const queryToJSON = (search: string) =>
  `{"${search
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')}"}`;
