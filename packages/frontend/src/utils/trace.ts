// trace is utility to show data inside the compose
export const trace = (message: string) => (data: any) => (
  // eslint-disable-next-line
  console.log(message, data), data
);
