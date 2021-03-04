import { enforce } from 'vest';

const URL_EXP = /^http[s]?:\/\/\w+(\.\w+)*(:[0-9]+)*(\/\w+)*\??(&?\w+=[-\w]+)*$/;

export const isUrl = (url: string) => enforce(url).matches(URL_EXP);
