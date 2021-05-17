import { enforce } from 'vest';
import validator from 'validator';

enforce.extend({
  isEmail: validator.isEmail,
  isURL(url: string) {
    return { pass: validateURL(url), message: '' };
  },
  isJSON(json: string) {
    return { pass: validateJSON(json), message: 'Invalid JSON' };
  },
  isJSONorURL(data: string) {
    return {
      pass: validateJSON(data) || validateURL(data),
      message: 'Invalid JSON',
    };
  },
});

export function validateURL(url: string): boolean {
  let result;
  try {
    result = new URL(url);
  } catch {
    return false;
  }

  return /https?:/.test(result.protocol);
}

export function validateJSON(json: string): boolean {
  try {
    JSON.parse(json);
  } catch {
    return false;
  }
  return true;
}

export default enforce;
