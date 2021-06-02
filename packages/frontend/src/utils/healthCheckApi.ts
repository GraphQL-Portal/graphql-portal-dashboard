import axios from 'axios';

export const healthCheckApi = async (endpoint: string) => {
  try {
    await axios.get(endpoint);
  } catch (error) {
    if (!error.response) return false;
    if (error.status === 404) return false;
  }
  return true;
};
