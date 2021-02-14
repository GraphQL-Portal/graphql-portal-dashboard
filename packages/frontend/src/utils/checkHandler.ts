import { ReactText } from 'react';

export const checkHandler = (fn: Function | undefined) =>
  fn ? fn : (text: ReactText) => text;
