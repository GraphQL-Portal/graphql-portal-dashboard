import { format } from 'date-fns';
import { ReactText } from 'react';
import { Scale } from '../types';

export const formatArgumentLabel = (scale: Scale) => (date: ReactText) =>
  format(new Date(date), scale === 'hour' ? 'HH:mm' : 'MMM d');
