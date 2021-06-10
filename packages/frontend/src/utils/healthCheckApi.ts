import axios from 'axios';
import { HttpStatus } from '../types';

export const healthCheckApi = async (endpoint: string) => {
  try {
    await axios.get(endpoint);
  } catch (error) {
    if (!error.response) return false;
    if (error.response.status === HttpStatus.NOT_FOUND) return false;
  }
  return true;
};
