export const compose = (...fns: any) =>
  fns.reduce((f: any, g: any) => (...args: any) => f(g(...args)));
