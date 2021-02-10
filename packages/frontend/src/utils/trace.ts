// trace is utility to show data inside the compose
// eslint-disable-next-line
export const trace = (message: string) => (data: any) => (
  console.log(message, data), data
);
