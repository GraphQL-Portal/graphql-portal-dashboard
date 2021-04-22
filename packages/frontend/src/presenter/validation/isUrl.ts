import { enforce } from 'vest';

function validateURL(url: string): boolean {
  let result;
  try {
    result = new URL(url);
  } catch (e) {
    return false;
  }

  return /https?:/.test(result.protocol);
}

enforce.extend({
  isValidUrl(url: string) {
    return { pass: validateURL(url), message: '' };
  },
});

export const isUrl = (url: string) => enforce(url).isValidUrl();
