import Cookies from 'js-cookie';
import { TOUR_FINISHED_KEY } from './constants';

export const storeTour = (isFinished: boolean) =>
  Cookies.set(TOUR_FINISHED_KEY, isFinished.toString());

export const getTour = () => Cookies.get(TOUR_FINISHED_KEY);
