// import validator from 'validator';
import { enforce } from 'vest';

// enforce.extend({ isURL: validator.isURL });

const URL_EXP = /^http:\/\/[-_\w]+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;

export const isUrl = (url: string) => enforce(url).matches(URL_EXP);
